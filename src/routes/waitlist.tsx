import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { PageLayout } from "@/components/PageLayout";
import {
  Mail,
  Star,
  ShieldCheck,
  BadgeCheck,
  Phone,
  User,
  MessageSquare,
  Lock,
  CheckCircle2,
  AlertCircle,
  Fingerprint,
  Clock,
} from "lucide-react";
import WaitListPromo from "@/components/WaitListPromo";

// ─── Turnstile type shim ────────────────────────────────────────────────────
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
  }
}

export const Route = createFileRoute("/waitlist")({
  component: WaitlistPage,
  head: () => ({
    meta: [
      { title: "Join the Waitlist - Visa Guard Africa" },
      {
        name: "description",
        content:
          "Be among the first travelers and verified agents to access a safer, more transparent visa platform.",
      },
    ],
  }),
});

// ─── Constants ───────────────────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: "+234", flag: "🇳🇬", label: "NG" },
  { code: "+233", flag: "🇬🇭", label: "GH" },
  { code: "+254", flag: "🇰🇪", label: "KE" },
  { code: "+27", flag: "🇿🇦", label: "ZA" },
  { code: "+251", flag: "🇪🇹", label: "ET" },
  { code: "+255", flag: "🇹🇿", label: "TZ" },
  { code: "+256", flag: "🇺🇬", label: "UG" },
  { code: "+225", flag: "🇨🇮", label: "CI" },
  { code: "+221", flag: "🇸🇳", label: "SN" },
  { code: "+44", flag: "🇬🇧", label: "GB" },
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+1", flag: "🇨🇦", label: "CA" },
  { code: "+353", flag: "🇮🇪", label: "IE" },
  { code: "+49", flag: "🇩🇪", label: "DE" },
  { code: "+33", flag: "🇫🇷", label: "FR" },
  { code: "+31", flag: "🇳🇱", label: "NL" },
  { code: "+971", flag: "🇦🇪", label: "AE" },
];

const RATE_LIMIT_KEY = "vga_waitlist_ts";
const RATE_LIMIT_MS = 60_000; // 1 minute between submissions
const MIN_FILL_MS = 3_000; // must spend ≥ 3 s filling form

// ─── Helpers ─────────────────────────────────────────────────────────────────
function inputCls(err?: string) {
  return [
    "h-12 w-full rounded-xl border bg-background pl-10 pr-4 text-sm outline-none transition",
    "focus:ring-2 focus:ring-primary/20",
    err ? "border-destructive focus:border-destructive" : "border-border focus:border-primary",
  ].join(" ");
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-sm font-medium">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {error ? (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3 shrink-0" /> {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function WaitlistPage() {
  const [form, setForm] = useState({ email: "", full_name: "", interests: "" });
  const [localPhone, setLocalPhone] = useState("");
  const [countryCode, setCC] = useState("+234");
  const [honeypot, setHoneypot] = useState(""); // invisible to humans
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobal] = useState<string | null>(null);
  const [fieldErrors, setFE] = useState<Record<string, string>>({});
  const [turnstileToken, setToken] = useState<string | null>(null);

  const formLoadTime = useRef(Date.now());
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  // ── Load Cloudflare Turnstile (explicit render mode) ──────────────────────
  useEffect(() => {
    // Replace with your real site key via env: VITE_TURNSTILE_SITE_KEY
    // Test key "1x00000000000000000000AA" always passes - swap before production.
    const SITE_KEY =
      (import.meta as any).env?.VITE_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

    if (!document.querySelector('script[src*="turnstile"]')) {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      document.head.appendChild(s);
    }

    const poll = setInterval(() => {
      if (window.turnstile && turnstileRef.current && !turnstileWidgetId.current) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: SITE_KEY,
          theme: "light",
          size: "normal",
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(null),
          "error-callback": () => setToken(null),
        });
        clearInterval(poll);
      }
    }, 100);

    return () => {
      clearInterval(poll);
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  const validateField = (name: string, value: string) => {
    const EMOJI_RE = /\p{Extended_Pictographic}/u;
    const HTML_RE = /<[^>]*>/;
    const SCRIPT_RE = /javascript:|data:|vbscript:/i;
    const SQL_RE = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|EXEC)\b)/i;
    const CTRL_RE = /[\x00-\x1F\x7F]/;
    const REPEAT_RE = /(.)\1{6,}/;
    const VALID_NAME_RE = /^[\p{L}\p{M}'\-\s]+$/u;
    const isSuspicious = (v: string) =>
      HTML_RE.test(v) || SCRIPT_RE.test(v) || SQL_RE.test(v) || CTRL_RE.test(v);

    let error = "";

    if (name === "full_name") {
      if (!value) error = "";
      else if (EMOJI_RE.test(value)) error = "Name must not contain emoji.";
      else if (isSuspicious(value)) error = "Name contains invalid characters.";
      else if (!VALID_NAME_RE.test(value))
        error = "Only letters, hyphens, and apostrophes are allowed.";
      else if (REPEAT_RE.test(value)) error = "Name looks invalid - repeated characters detected.";
    }

    if (name === "email") {
      const LOCAL_RE = /^[a-zA-Z0-9]([a-zA-Z0-9._+\-]*[a-zA-Z0-9])?$/;
      const DOMAIN_RE = /^[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/; // valid domain
      const CONSEC_RE = /[.+_\-]{2,}/; // consecutive special chars like ///, ..., --

      if (!value) error = "";
      else if (EMOJI_RE.test(value)) error = "Email must not contain emoji.";
      else if (isSuspicious(value)) error = "Email contains invalid characters.";
      else if (value.length > 254) error = "Email address is too long.";
      else if (!value.includes("@")) error = "Email must contain @.";
      else {
        const [local, ...rest] = value.split("@");
        const domain = rest.join("@"); // handles edge case of multiple @

        if (rest.length > 1) error = "Email must contain only one @.";
        else if (!local) error = "Email cannot start with @.";
        else if (!domain) error = "Please enter a domain (e.g. gmail.com).";
        else if (CONSEC_RE.test(local)) error = "Email contains consecutive special characters.";
        else if (/[^a-zA-Z0-9._+\-]/.test(local))
          error = "Email local part contains invalid characters.";
        else if (!LOCAL_RE.test(local))
          error = "Email cannot start or end with a special character.";
        else if (!DOMAIN_RE.test(domain)) error = "Email domain looks invalid (e.g. gmail.com).";
        else if (!domain.includes(".")) error = "Email domain must include a TLD (e.g. .com).";
      }
    }
    if (name === "phone") {
      const n = value.replace(/^0+/, "");
      if (!value) error = "";
      else if (EMOJI_RE.test(value)) error = "Phone must not contain emoji.";
      else if (n.length < 7) error = "Too short - must be at least 7 digits.";
      else if (n.length > 12) error = "Too long - max 12 digits.";
    }

    if (name === "interests") {
      if (!value) error = "";
      else if (EMOJI_RE.test(value)) error = "Please use plain text only - no emoji.";
      else if (isSuspicious(value)) error = "Response contains invalid characters.";
      else if (REPEAT_RE.test(value))
        error = "Response looks invalid - repeated characters detected.";
      else if (value.length > 500) error = "Must be under 500 characters.";
    }

    setFE((p) => ({ ...p, [name]: error }));
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    // ── Shared patterns ──────────────────────────────────────────────────────
    const EMOJI_RE = /\p{Extended_Pictographic}/u;
    const HTML_RE = /<[^>]*>/;
    const SCRIPT_RE = /javascript:|data:|vbscript:/i;
    const SQL_RE = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|EXEC)\b)/i;
    const CTRL_RE = /[\x00-\x1F\x7F]/; // control characters
    const REPEAT_RE = /(.)\1{6,}/; // same char 7+ times in a row

    const isSuspicious = (v: string) =>
      HTML_RE.test(v) || SCRIPT_RE.test(v) || SQL_RE.test(v) || CTRL_RE.test(v);

    // ── Full name ────────────────────────────────────────────────────────────
    const name = form.full_name.trim();
    const VALID_NAME_RE = /^[\p{L}\p{M}'\-\s]+$/u; // letters (any script), marks, apostrophe, hyphen, space

    if (!name) errs.full_name = "Full name is required.";
    else if (EMOJI_RE.test(name)) errs.full_name = "Name must not contain emoji.";
    else if (isSuspicious(name)) errs.full_name = "Name contains invalid characters.";
    else if (!VALID_NAME_RE.test(name))
      errs.full_name = "Only letters, hyphens, and apostrophes are allowed.";
    else if (name.length < 2) errs.full_name = "Must be at least 2 characters.";
    else if (name.split(/\s+/).filter(Boolean).length < 2)
      errs.full_name = "Please enter your first and last name.";
    else if (REPEAT_RE.test(name))
      errs.full_name = "Name looks invalid - repeated characters detected.";

    // ── Email ────────────────────────────────────────────────────────────────
    const email = form.email.trim();
    const LOCAL_RE = /^[a-zA-Z0-9]([a-zA-Z0-9._+\-]*[a-zA-Z0-9])?$/;
    const DOMAIN_RE = /^[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    const CONSEC_RE = /[.+_\-]{2,}/;

    if (!email) errs.email = "Email address is required.";
    else if (EMOJI_RE.test(email)) errs.email = "Email must not contain emoji.";
    else if (isSuspicious(email)) errs.email = "Email contains invalid characters.";
    else if (email.length > 254) errs.email = "Email address is too long.";
    else if (!email.includes("@")) errs.email = "Email must contain @.";
    else {
      const [local, ...rest] = email.split("@");
      const domain = rest.join("@");

      if (rest.length > 1) errs.email = "Email must contain only one @.";
      else if (!local) errs.email = "Email cannot start with @.";
      else if (!domain) errs.email = "Please enter a domain (e.g. gmail.com).";
      else if (CONSEC_RE.test(local)) errs.email = "Email contains consecutive special characters.";
      else if (/[^a-zA-Z0-9._+\-]/.test(local))
        errs.email = "Email local part contains invalid characters.";
      else if (!LOCAL_RE.test(local))
        errs.email = "Email cannot start or end with a special character.";
      else if (!DOMAIN_RE.test(domain)) errs.email = "Email domain looks invalid (e.g. gmail.com).";
      else if (!domain.includes(".")) errs.email = "Email domain must include a TLD (e.g. .com).";
    }

    // ── Phone ─────────────────────────────────────────────────────────────────
    if (localPhone) {
      const n = localPhone.replace(/^0+/, "");
      if (EMOJI_RE.test(localPhone)) errs.phone = "Phone number must not contain emoji.";
      else if (n.length < 7) errs.phone = "Too short - must be at least 7 digits.";
      else if (n.length > 12) errs.phone = "Too long - max 12 digits.";
    }

    // ── Interests ─────────────────────────────────────────────────────────────
    const interests = form.interests.trim();

    if (interests.length > 500) errs.interests = "Must be under 500 characters.";
    else if (EMOJI_RE.test(interests)) errs.interests = "Please use plain text only - no emoji.";
    else if (isSuspicious(interests)) errs.interests = "Response contains invalid characters.";
    else if (REPEAT_RE.test(interests))
      errs.interests = "Response looks invalid - repeated characters detected.";

    setFE(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobal(null);

    if (honeypot) return;

    if (Date.now() - formLoadTime.current < MIN_FILL_MS) {
      setGlobal("Please take a moment to fill in your details.");
      return;
    }

    const last = localStorage.getItem(RATE_LIMIT_KEY);
    if (last && Date.now() - parseInt(last) < RATE_LIMIT_MS) {
      const sec = Math.ceil((RATE_LIMIT_MS - (Date.now() - parseInt(last))) / 1000);
      setGlobal(`Please wait ${sec}s before submitting again.`);
      return;
    }

    if (!turnstileToken) {
      setGlobal("Please complete the security check below.");
      return;
    }

    // 5. Field validation
    if (!validate()) return;

    setLoading(true);

    // Build phone - strip leading zeros then prepend dial code
    const stripped = localPhone.replace(/^0+/, "");
    const phone_number = stripped ? `${countryCode}${stripped}` : undefined;

    try {
      const res = await fetch(
        "https://visaguardafrica.com/waitlist.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-Submission-Timestamp": String(Date.now()),
            // Forward Turnstile token so backend can verify server-side
            "X-CF-Turnstile-Token": turnstileToken,
          },
          body: JSON.stringify({
            email: form.email.trim(),
            full_name: form.full_name.trim(),
            ...(phone_number && { phone_number }),
            ...(form.interests.trim() && { interests: form.interests.trim() }),
          }),
        },
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg = data?.detail?.[0]?.msg ?? data?.detail ?? "Something went wrong.";
        throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
      }

      localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
      setSubmitted(true);
    } catch (err: any) {
      setGlobal(err.message ?? "An unexpected error occurred.");
      // Always reset widget on error so user can retry
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setForm({ email: "", full_name: "", interests: "" });
    setLocalPhone("");
    setCC("+234");
    setSubmitted(false);
    setGlobal(null);
    setFE({});
    formLoadTime.current = Date.now();
    if (window.turnstile && turnstileWidgetId.current) {
      window.turnstile.reset(turnstileWidgetId.current);
      setToken(null);
    }
  };

  const firstName = form.full_name.trim().split(" ")[0];

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <PageLayout>
      <section className="min-h-screen bg-hero-cream">
        <div className="mx-auto grid max-w-6xl gap-7 md:gap-10 px-6 py-18 md:grid-cols-[1fr_1.1fr] md:items-center md:py-24">
          {/* ── LEFT: Brand panel ── */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-1 md:gap-2 rounded-full border border-primary/30 bg-primary/10 px-2 py-1 md:px-4 md:py-1.5 text-[.6rem] md:text-xs font-medium text-primary">
              <span className="h-1 w-1 animate-pulse rounded-full bg-primary" />
              Launching Soon
            </span>

            <div>
              <h1 className="text-3xl font-bold leading-[1.1] md:text-5xl">
                Get Early <span className="italic-serif text-primary">Access,</span>
                <br />
                Join The <span className="italic-serif text-primary">Waitlist.</span>
              </h1>
              <p className="text-xs md:text-sm mt-4 max-w-md text-muted-foreground capitalize text">
                Be among the first travelers and agents to access a safer, more transparent visa
                platform built to protect Africans from scams and Insecure Tractions
              </p>
            </div>

            {/* Trust pillars */}
            <div className="space-y-3">
              {[
                {
                  icon: ShieldCheck,
                  label: "Verified Agents Only",
                  desc: "Every agent is reviewed and vetted before listing.",
                },
                {
                  icon: Lock,
                  label: "Escrow-Protected Payments",
                  desc: "Funds are held securely until milestones complete.",
                },
                {
                  icon: Fingerprint,
                  label: "NDPR Compliant",
                  desc: "Your personal data is encrypted and protected by law.",
                },
                {
                  icon: Clock,
                  label: "Real-Time Tracking",
                  desc: "Monitor every milestone of your visa application live.",
                },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-semibold">{label}</p>
                    <p className="text-[.7rem] md:text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <WaitListPromo />
          </div>

          {/* ── RIGHT: Form card ── */}
          <div className="rounded-2xl w-full border border-border bg-background p-4 md:p-8 shadow-xl">
            {!submitted ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold">Reserve Your Spot</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fill in your details below - it takes under a minute.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* ── Honeypot (invisible to real users, bots fill it) ── */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      top: "auto",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                  >
                    <label htmlFor="vga_website">Website</label>
                    <input
                      id="vga_website"
                      name="vga_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Full name */}
                  <Field label="Full Name" required error={fieldErrors.full_name}>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={form.full_name}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, full_name: e.target.value }));
                          validateField("full_name", e.target.value);
                        }}
                        placeholder="e.g. Chukwuemeka Obi"
                        className={inputCls(fieldErrors.full_name)}
                      />
                    </div>
                  </Field>

                  {/* Email */}
                  <Field label="Email Address" required error={fieldErrors.email}>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, email: e.target.value }));
                          validateField("email", e.target.value);
                        }}
                        placeholder="you@example.com"
                        className={inputCls(fieldErrors.email)}
                      />
                    </div>
                  </Field>

                  {/* Phone */}
                  <Field
                    label="Phone Number"
                    error={fieldErrors.phone}
                    hint="Optional - enter without leading zero (e.g. 8012345678)"
                  >
                    <div
                      className={[
                        "flex overflow-hidden rounded-xl border transition focus-within:ring-2 focus-within:ring-primary/20",
                        fieldErrors.phone
                          ? "border-destructive focus-within:border-destructive"
                          : "border-border focus-within:border-primary",
                      ].join(" ")}
                    >
                      <select
                        value={countryCode}
                        onChange={(e) => setCC(e.target.value)}
                        className="shrink-0 border-r border-border bg-transparent py-3 pl-3 pr-2 text-sm outline-none"
                      >
                        {COUNTRY_CODES.map((c, i) => (
                          <option key={`${c.code}-${c.label}-${i}`} value={c.code}>
                            {c.label} ({c.code})
                          </option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="tel"
                          autoComplete="tel-national"
                          value={localPhone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setLocalPhone(val);
                            validateField("phone", val);
                          }}
                          placeholder="8012345678"
                          className="h-12 w-full bg-transparent pl-9 pr-4 text-sm outline-none"
                        />
                      </div>
                    </div>
                  </Field>

                  {/* Interests */}
                  <Field
                    label="What Are You Interested In?"
                    error={fieldErrors.interests}
                    hint={`${form.interests.length}/500 · Optional`}
                  >
                    <div className="relative">
                      <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <textarea
                        value={form.interests}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, interests: e.target.value }));
                          validateField("interests", e.target.value);
                        }}
                        placeholder="e.g. UK student visa, Canada PR, Schengen tourist..."
                        rows={3}
                        maxLength={500}
                        className={[
                          "w-full resize-none rounded-xl border bg-background py-3 pl-9 pr-4 text-sm outline-none transition",
                          "focus:ring-2 focus:ring-primary/20",
                          fieldErrors.interests
                            ? "border-destructive focus:border-destructive"
                            : "border-border focus:border-primary",
                        ].join(" ")}
                      />
                    </div>
                  </Field>

                  {/* ── Cloudflare Turnstile ── */}
                  <div className="space-y-2 rounded-xl border border-border bg-accent/30 p-3 w-full overflow-hidden">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      Security Verification
                    </p>
                    <div className="flex justify-center md:justify-start w-full overflow-hidden max-w-[200px]  md:max-w-[300px]">
                      <div
                        ref={turnstileRef}
                        className="cf-turnstile w-full max-w-[190px] md:max-w-[300px]"
                      />
                    </div>
                    {turnstileToken ? (
                      <p className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <CheckCircle2 className="h-3 w-3" /> Verification passed
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Complete the check above to enable submission.
                      </p>
                    )}
                  </div>

                  {/* Global error */}
                  {globalError && (
                    <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{globalError}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || !turnstileToken}
                    className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Reserving your spot…" : "Join the Waitlist"}
                  </button>

                  {/* Privacy note */}
                  <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    NDPR-compliant · Encrypted · No spam, ever.
                  </p>
                </form>
              </>
            ) : (
              /* ── Success state ── */
              <div className="flex flex-col items-center py-8 text-center animate-fade-in">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                  <BadgeCheck className="h-9 w-9" />
                </div>
                <h2 className="mt-5 text-2xl font-bold">You're In, {firstName}!</h2>
                <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                  We'll send updates to <strong className="text-foreground">{form.email}</strong>{" "}
                  when we launch. Watch your inbox.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {["Verified", "Escrow-Protected", "NDPR Compliant"].map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      <CheckCircle2 className="h-3 w-3" /> {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleReset}
                  className="mt-8 text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
                >
                  Submit another response
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
