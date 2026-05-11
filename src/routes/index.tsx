import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { PageLayout } from "@/components/PageLayout";
import { DownloadAppDialog } from "@/components/DownloadAppDialog";
import {
  ShieldCheck,
  Shield,
  Lock,
  Wallet,
  FileCheck,
  AlertTriangle,
  ChevronDown,
  Star,
  ArrowRight,
  Download,
  Users,
  BadgeCheck,
  UserCheck,
  MapPin,
  CircleCheckBig,
} from "lucide-react";
import heroPhones from "@/assets/hero-phones.png";
import planeFront from "@/assets/plane-front.png";
import planeSky from "@/assets/SidePlane.png";
import handShake from "@/assets/handshake.png";
import Passport from "@/assets/Passport.png";
import PlaneAir from "@/assets/PlaneAir.png";
import agent1 from "@/assets/agent1.jpg";
import agent2 from "@/assets/agent2.jpg";
import agent3 from "@/assets/agent3.jpg";
import singlePhone from "@/assets/singlePhone.png";
import WaitListPromo from "@/components/WaitListPromo";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const trustFeatures = [
  {
    icon: UserCheck,
    title: "Verified Agents",
    desc: "Every Visa Agent is reviewd and verified before operating on the platform.",
  },
  {
    icon: Lock,
    title: "Escrow Protection",
    desc: "Payments Remain protected until agreed milestones are completed",
    tag: "Secure Funding",
    tag1: "Escrow Protection",
  },
  {
    icon: Shield,
    title: "Secure Transaction",
    desc: "All payments and sensitive information are securely processed and protected.",
    tag: "Verified Payment Gateway",
    tag1: "Secure Funding",
  },
  {
    icon: ShieldCheck,
    title: "NDPR Compliance",
    desc: "Your personal data is handled according to NDPR compliance standards.",
    tag: "Data Protected",
    tag1: "NDPR Complaince",
  },
  {
    icon: MapPin,
    title: "Real Time Tracking",
    desc: "Track Visa progress, milestone, and updates directly within the App.",
    tag: "Real-Time Tracking",
    tag1: "Visa Progress",
  },
  {
    icon: AlertTriangle,
    title: "Scam Detection",
    desc: "Every featurw is designed to improve transparency, accountability and traveler safety",
    tag: "Safety First",
  },
];

const agents = [
  {
    name: "Sarah Johnson",
    role: "UK · Schengen Specialist",
    price: "₦150,000",
    img: agent1,
    rating: 4.9,
    cases: "150+",
    tags: ["Student Visa", "Relocation", "Schengen Visa"],
    desc: "Professional guidance for Tier 4 student visa applications, document preparation, and embassy appointment support.",
  },
  {
    name: "Jennifer Shann",
    role: "Canada · Study Visa",
    price: "₦150,000",
    img: agent2,
    rating: 4.9,
    cases: "150+",
    tags: ["Student Visa", "Relocation", "Schengen Visa"],
    desc: "Professional guidance for Tier 4 student visa applications, document preparation, and embassy appointment support.",
  },
  {
    name: "Alex D Johnson",
    role: "USA · Business Visa",
    price: "₦150,000",
    img: agent3,
    rating: 4.9,
    cases: "150+",
    tags: ["Student Visa", "Relocation", "Schengen Visa"],
    desc: "Professional guidance for Tier 4 student visa applications, document preparation, and embassy appointment support.",
  },
];

const faqs = [
  {
    q: "What is Visa Guard Africa exactly about?",
    a: "Visa Guard Africa is a trust-first visa platform that connects African travelers with verified visa professionals, secured by escrow payments and transparent milestone tracking - built specifically to prevent scams and accountability gaps.",
  },
  {
    q: "How do I sign up?",
    a: "Download the app and complete a short onboarding to verify your identity. You'll be matched with verified agents in minutes.",
  },
  {
    q: "What makes you trusted?",
    a: "Every agent is reviewed and verified. Funds sit in escrow until milestones complete, and our scam detection layer monitors activity continuously.",
  },
  {
    q: "Can I track my visa journey?",
    a: "Yes. Every milestone, document and message is tracked live inside the app.",
  },
  {
    q: "Is my data protected?",
    a: "Absolutely. We are NDPR-compliant and use bank-grade encryption for everything.",
  },
];

function HomePage() {
  const [download, setDownload] = useState(false);
  const [activeAgent, setActiveAgent] = useState(0);
  const [activeTrust, setActiveTrust] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const autoTrustRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleTrustTouchStart = (e: React.TouchEvent) => {
    // Pause auto-advance while user interacts
    clearInterval(autoTrustRef.current!);
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTrustTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const THRESHOLD = 40; // min px to count as intentional swipe

    const isHorizontal = Math.abs(dx) > Math.abs(dy);
    const isVertical = Math.abs(dy) > Math.abs(dx);

    if (isHorizontal && Math.abs(dx) > THRESHOLD) {
      // swipe left → next, swipe right → previous
      setActiveTrust((p) =>
        dx < 0
          ? (p + 1) % trustFeatures.length
          : (p - 1 + trustFeatures.length) % trustFeatures.length,
      );
    } else if (isVertical && Math.abs(dy) > THRESHOLD) {
      // swipe up → next, swipe down → previous
      setActiveTrust((p) =>
        dy < 0
          ? (p + 1) % trustFeatures.length
          : (p - 1 + trustFeatures.length) % trustFeatures.length,
      );
    }

    touchStart.current = null;

    // Resume auto-advance after 5s of inactivity
    autoTrustRef.current = setInterval(
      () => setActiveTrust((p) => (p + 1) % trustFeatures.length),
      2800,
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageLayout>
      {/* HERO */}
      <section className="bg-hero-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-18 md:grid-cols-2 md:py-24">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2 py-1 md:px-4 md:py-1.5 text-[.6rem] md:text-xs font-medium text-primary shadow-sm">
              <span className="h-1 w-1 rounded-full bg-primary" />
              Protecting Africans From Visa Scams
            </div>
            <h1 className="text-3xl font-bold leading-[1.1] text-foreground md:text-6xl">
              Connect With <span className="italic-serif text-primary">Trusted</span> &{" "}
              <span className="italic-serif text-primary">Verified</span> Visa Experts Across
              Africa.
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground md:text-lg">
              Visa Guard Africa Helps Travelers Avoid Scams Through Verified Agents, Secure Escrow
              Payments, And Transparent Application Tracking.
            </p>
            <WaitListPromo />
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setDownload(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 w-full md:w-fit justify-center"
              >
                <Download className="h-4 w-4" /> Download App
              </button>
              <Link
                to="/waitlist"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 text-sm font-semibold transition hover:bg-accent justify-center w-full md:w-fit"
              >
                <Users className="h-4 w-4" /> Join the Waitlist
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroPhones}
              alt="App preview"
              className="mx-auto w-full max-w-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-primary py-4">
        <div className="flex">
          <div className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <span
                  key={i}
                  className="flex items-center gap-8 text-sm font-medium text-primary-foreground"
                >
                  <span>Verification</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Escrow Protection</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Transparent Tracking</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Create A Safer Visa Experience</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Verification</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Escrow Protection</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Transparent Tracking</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Create A Safer Visa Experience</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Verification</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Escrow Protection</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Transparent Tracking</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Create A Safer Visa Experience</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Verification</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Escrow Protection</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Transparent Tracking</span>
                  <span className="text-primary-foreground/40">·</span>
                  <span>Create A Safer Visa Experience</span>
                  <span className="text-primary-foreground/40">·</span>
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* TRAVEL SMARTER */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary shadow-sm">
              <span className="h-1 w-1 rounded-full bg-primary" />
              Secure Visa Processing
            </div>
            <h2 className="text-3xl mt-3 font-bold md:text-5xl">
              Travel <span className="italic-serif text-primary">Smarter.</span> Travel{" "}
              <span className="italic-serif text-primary">Protected.</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-xs md:text-sm">
              From Verified Visa Support To Secure Travel Guidance, Visa Guard Africa
            </p>
            <p className="mt-1 text-muted-foreground text-xs md:text-sm">
              Helps Traveler Move Forward With Greater Confidence & Protection.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-4 md:grid-rows-2">
            {/* Large plane - spans 1 col, 2 rows */}
            <div className="relative overflow-hidden rounded-2xl md:col-span-2 md:row-span-2">
              <img
                src={planeFront}
                alt="Plane"
                className="h-full min-h-64 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-15 left-4 max-w-md text-white">
                <h3 className="text-sm md:text-2xl font-bold">
                  Your Trusted Travel Protection Partner
                </h3>
                <p className="mt-2 text-xs md:text-sm text-white/80">
                  From Verified Visa Support To Secure Travel Guidance, Visa Guard Africa Helps
                  Travelers Move Forward With Greater Confidence & Protection.
                </p>
              </div>
            </div>

            {/* Trusted Platform - image card */}
            <div className="relative overflow-hidden rounded-2xl md:row-span-1">
              <img
                src={handShake}
                alt="Trusted Platform"
                className="h-full min-h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-10 left-2.5 text-white">
                <h3 className="text-sm md:text-2xl font-bold">Trusted Platform</h3>
                <p className="mt-1 text-xs md:text-sm text-white/80">
                  Built Around Transparency, Accountability, And Traveler Protection.
                </p>
              </div>
            </div>

            {/* Visa Support - image card */}
            <div className="relative overflow-hidden rounded-2xl md:row-span-1">
              <img
                src={Passport}
                alt="Visa Support"
                className="h-full min-h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-10 left-2.5 text-white">
                <h3 className="text-sm md:text-2xl font-bold">Visa Support</h3>
                <p className="mt-1 text-xs md:text-sm text-white/80">
                  Get Professional Assistance For Smoother And More Transparent Visa Processing.
                </p>
              </div>
            </div>

            {/* Global Travel - spans 2 cols */}
            <div className="relative overflow-hidden rounded-2xl md:col-span-2">
              <img
                src={planeSky}
                alt="Global Travel"
                className="h-full min-h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-15 left-4 text-white">
                <h3 className="text-sm md:text-2xl font-bold">Global Travel</h3>
                <p className="mt-1 text-xs md:text-sm text-white/80">
                  Explore International Opportunities With <br /> Safer And More Trusted Travel
                  Support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST GRID */}
      <section className="bg-accent/40 md:py-20 py-10">
        <div className="mx-auto max-w-7xl px-2 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Built Around <span className="italic-serif text-primary">Trust</span> &{" "}
              <span className="italic-serif text-primary">Protection</span>
            </h2>
            <p className="mt-3 mx-auto max-w-xl text-muted-foreground capitalize">
              Visa Guard Africa combines verification, escrow protection, and{" "}
              <br className="hidden md:block" />
              transparent tracking to create a safer visa experience for Africans.
            </p>
          </div>

          {/* Mobile: stacked card shuffle */}
          <div
            className="relative mt-12 md:hidden touch-pan-y select-none"
            style={{ height: "300px" }}
            onTouchStart={handleTrustTouchStart}
            onTouchEnd={handleTrustTouchEnd}
          >
            {trustFeatures.map((f, i) => {
              const offset = (i - activeTrust + trustFeatures.length) % trustFeatures.length;
              const isActive = offset === 0;
              const isNext = offset === 1;
              const isBehind = offset === 2;
              const isHidden = offset > 2;

              return (
                <div
                  key={f.title}
                  className="absolute inset-x-0 rounded-2xl border-t-4 border-t-primary bg-background p-3"
                  style={{
                    transform: isActive
                      ? "translateY(0px) scale(1)"
                      : isNext
                        ? "translateY(-14px) scale(0.96)"
                        : isBehind
                          ? "translateY(-24px) scale(0.92)"
                          : "translateY(-24px) scale(0.92)",
                    opacity: isHidden ? 0 : 1,
                    zIndex: isActive ? 30 : isNext ? 20 : isBehind ? 10 : 0,
                    transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <TrustCard f={f} agent1={agent1} agent2={agent2} agent3={agent3} />
                </div>
              );
            })}
          </div>

          {/* Desktop: grid */}
          <div className="mt-12 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 md:grid">
            {trustFeatures.map((f) => (
              <div
                key={f.title}
                className="relative h-full min-h-54 rounded-2xl border-t-4 border-t-primary bg-background p-6 transition hover:border-b-4 hover:border-b-primary hover:border-t-0"
              >
                <TrustCard f={f} agent1={agent1} agent2={agent2} agent3={agent3} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              How It <span className="italic-serif text-primary">Works</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              A simple, transparent, end-to-end process designed to protect travelers from end to
              end.
            </p>
            <ol className="mt-8 space-y-5">
              {[
                ["Find Verified Agent", "Browse vetted experts who match your visa goal."],
                ["Fund Through Escrow", "Pay safely - funds release only on milestone completion."],
                ["Process Approval And Tracking", "Watch real-time progress on your application."],
                ["Visa & Trip Done", "Travel with peace of mind, fully supported."],
                ["Complete Your Journey", "We stay with you through arrival and beyond."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold">{t}</h4>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative overflow-hidden rounded-3xl hidden md:flex">
            <img src={PlaneAir} alt="" className="h-[480px] w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-15 left-8 right-8 text-white">
              <h3 className="md:text-3xl text-xl font-bold">Protecting Africans From Visa Scams</h3>
              <p className="mt-2 text-sm text-white/80">
                Visa Guard Africa uses a secure escrow system to hold funds safely until both
                parties meet agreed conditions? This helps prevent fraud and ensures transparency in
                every transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AGENTS */}
      <section className="bg-accent/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary shadow-sm">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Verified Marketplace
          </div>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Explore <span className="italic-serif text-primary">Trusted & Verified</span> <br />
            Visa Services And Agents.
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Connect With Verified Visa Professionals Offering Secure, Transparent, And
            Escrow-Protected Immigration Support Across Multiple Countries.
          </p>

          {/* Desktop Grid */}
          <div className="mt-10 hidden gap-5 md:grid md:grid-cols-3">
            {agents.map((a) => (
              <AgentCard key={a.name} agent={a} />
            ))}
          </div>

          {/* Mobile Fade Carousel */}
          <div className="relative mt-10 md:hidden">
            {agents.map((a, i) => (
              <div
                key={a.name}
                className={`transition-opacity duration-700 ${
                  i === activeAgent ? "relative opacity-100" : "absolute inset-0 opacity-0"
                }`}
              >
                <AgentCard agent={a} />
              </div>
            ))}
          </div>

          <button className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            View Services
          </button>
        </div>
      </section>

      {/* PAYMENTS BLOCK */}
      <section className="md:pt-20 pt-20 md:bg-accent/50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl bg-accent/50 md:bg-transparent pt-10 px-6 md:grid-cols-2 md:pt-16 justify-center text-center md:text-start">
          <div>
            <h2 className="text-3xl font-bold md:text-6xl">
              Your Payments Stay <span className="italic-serif text-primary">Secured</span> &{" "}
              <span className="italic-serif text-primary">Protected</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Funds are held safely in escrow and released as your visa milestones are completed.
            </p>
            <button
              onClick={() => setDownload(true)}
              className="mt-6 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Learn More
            </button>
          </div>
          <img src={singlePhone} alt="" className="mx-auto w-full max-w-md" loading="lazy" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Support / Contact
          </p>
          <h2 className="mt-2 text-center text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Everything you need to know about working with verified visa agents.
          </p>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <FaqItem key={i} {...f} defaultOpen={i === 0} />
            ))}
          </div> 
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-footer mb-20 py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Start Your Visa Journey Safely</h2>
          <p className="mt-3 text-white/70">
            Find verified visa professionals and process applications with greater confidence.
          </p>
          <div className="mt-5 flex justify-center gap-2 text-yellow-400">
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
          </div>
          <p className="mt-1 text-sm text-white/70">1000+ Users Already On Waitlist</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setDownload(true)}
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-foreground w-full md:w-fit"
            >
              Download the App
            </button>
            <Link
              to="/waitlist"
              className="flex justify-center items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white  w-full md:w-fit hover:bg-white/10"
            >
              <Users className="h-4 w-4" /> Join Waitlist
            </Link>
          </div>
        </div>
      </section>

      <DownloadAppDialog open={download} onOpenChange={setDownload} />
    </PageLayout>
  );
}

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="rounded-xl border border-border bg-background">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-semibold">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="px-5 pb-5 text-sm text-muted-foreground">{a}</p>}
    </div>
  );
}

function TrustCard({
  f,
  agent1,
  agent2,
  agent3,
}: {
  f: (typeof trustFeatures)[0];
  agent1: string;
  agent2: string;
  agent3: string;
}) {
  return (
    <>
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/90 text-white">
        <f.icon color="#fff" className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
      {f.tag ? (
        <div className="mt-4 flex items-center gap-2 md:absolute md:bottom-7">
          <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[.6rem] font-medium text-primary md:text-xs">
            <CircleCheckBig size={10} /> {f.tag}
          </span>
          {f.tag1 && (
            <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[.6rem] font-medium text-primary md:text-xs">
              <CircleCheckBig size={10} /> {f.tag1}
            </span>
          )}
        </div>
      ) : (
        <div className="mt-2 flex w-fit items-center gap-3 rounded-full px-1 md:px-3 py-2 md:py-4 shadow">
          <div className="flex -space-x-2">
            {[agent1, agent2, agent3].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-7 w-7 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <Star className="h-4 w-4 fill-current text-yellow-500" />
          <span className="text-[.6rem] md:text-sm text-muted-foreground">VERIFIED AGENTS</span>
        </div>
      )}
    </>
  );
}

function AgentCard({ agent }: { agent: (typeof agents)[0] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <img src={agent.img} alt={agent.name} className="h-80 w-full object-cover" loading="lazy" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold">{agent.name}</h4>
            <BadgeCheck fill="#28A745" className="h-5 w-5" color="#fff" />
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">Starting from</p>
            <p className="text-sm font-bold text-primary">{agent.price}</p>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-foreground">{agent.rating}</span>
          <span>·</span>
          <span>{agent.cases} successful cases</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {agent.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-border px-2.5 py-0.5 text-xs">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{agent.desc}</p>
        <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Escrow Protected
          </span>
          <span className="flex items-center gap-1">
            <FileCheck className="h-3 w-3" /> NDPR Compliant
          </span>
          <span className="flex items-center gap-1">
            <FileCheck className="h-3 w-3" /> Verified Documents
          </span>
        </div>
      </div>
    </div>
  );
}
