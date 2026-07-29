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
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  Download,
  Users,
  BadgeCheck,
  UserCheck,
  MapPin,
  CircleCheckBig,
  Plus,
  Minus,
} from "lucide-react";
import heroPhones from "@/assets/hero-phones.png";
import trusted from "@/assets/trusted.png";
import planeSky from "@/assets/SidePlane.png";
import handShake from "@/assets/handshake.png";
import verified from "@/assets/verified.png";
import PlaneAir from "@/assets/PlaneAir.png";
import worldMap from "@/assets/worldMap.png";
import agent1 from "@/assets/agent1.jpg";
import agent2 from "@/assets/agent2.jpg";
import agent3 from "@/assets/agent3.jpg";
import singlePhone from "@/assets/singlePhone.png";
import WaitListPromo from "@/components/WaitListPromo";
import Pill from "@/components/Pill";

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
    name: "Sarah Johnson",
    role: "UK · Schengen Specialist",
    price: "₦150,000",
    img: agent1,
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


function chunk<T>(items: T[], size: number): T[][] {
  if (size <= 0) return [items];
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

function HomePage() {
  const [download, setDownload] = useState(false);
  const [activeAgent, setActiveAgent] = useState(0);

  // Trust grid carousel state
  const [activeTrust, setActiveTrust] = useState(0);
  const [trustPerView, setTrustPerView] = useState(1);
  const touchStart = useRef<{ x: number } | null>(null);
  const autoTrustRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const trustPages = chunk(trustFeatures, trustPerView);
  const trustTotal = trustPages.length;
  const safeTrustIndex = Math.min(activeTrust, trustTotal - 1);

  const goToTrust = (index: number) =>
    setActiveTrust(((index % trustTotal) + trustTotal) % trustTotal);

  const startTrustAutoplay = () => {
    if (autoTrustRef.current) clearInterval(autoTrustRef.current);
    autoTrustRef.current = setInterval(() => {
      setActiveTrust((p) => (p + 1) % trustTotal);
    }, 4000);
  };

  
  useEffect(() => {
    const computeTrustPerView = () => {
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640) return 2;
      return 1;
    };
    const update = () => setTrustPerView(computeTrustPerView());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  
  useEffect(() => {
    startTrustAutoplay();
    return () => {
      if (autoTrustRef.current) clearInterval(autoTrustRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trustTotal]);

  const handleTrustTouchStart = (e: React.TouchEvent) => {
    if (autoTrustRef.current) clearInterval(autoTrustRef.current);
    touchStart.current = { x: e.touches[0].clientX };
  };

  const handleTrustTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const THRESHOLD = 40; // min px to count as an intentional swipe

    if (dx <= -THRESHOLD) {
      goToTrust(safeTrustIndex + 1);
    } else if (dx >= THRESHOLD) {
      goToTrust(safeTrustIndex - 1);
    }

    touchStart.current = null;
    startTrustAutoplay();
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
      <section className="bg-white md:bg-hero-cream">
        <div className="mx-auto grid max-w-7xl items-center md:text-start text-center gap-10 px-6 pt-18 md:grid-cols-2 md:py-24">
          <div className="space-y-3 sm:space-y-5">
            <Pill text="Protecting Africans From Visa Scams" />
            <h1 className="text-xl tracking-tight text-balance sm:text-5xl font-bold leading-[1.01] text-foreground md:text-7xl">
              Protecting <span className="italic-serif text-primary">African Travelers</span>{" "}
              Through <span className="italic-serif text-primary">Trust</span>,{" "}
              <span className="italic-serif text-primary">Security</span>, and{" "}
              <span className="italic-serif text-primary">Transparency</span>.
            </h1>
            <p className="max-w-xl text-[.7rem] sm:text-xs md:text-sm text-muted-foreground">
              Visa Guard Africa connects travelers with verified visa professionals, secure escrow
              payments, and trusted embassy resources helping you verify before you pay and apply
              with confidence.
            </p>
            <WaitListPromo />
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setDownload(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-xs sm:text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 w-full md:w-fit justify-center"
              >
                <Download className="h-4 w-4 tracking-tight" /> Download App
              </button>
              <Link
                to="/waitlist"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 text-xs sm:text-sm font-semibold transition hover:bg-accent justify-center w-full md:w-fit"
              >
                <Users className="h-4 w-4 tracking-tight" /> Join the Waitlist
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={worldMap}
              alt="App preview"
              className="mx-auto w-full max-w-1.5xl"
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
                <span key={i} className="flex tracking-tight items-center gap-1 text-xl text-primary-foreground">
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
      <section className="md:py-20 py-5">
        <div className="mx-auto max-w-7xl sm:px-6 px-2">
          <div className="text-center mt-4">
            <Pill text="Secure Visa Processing" />
            <h2 className="text-xl tracking-tight sm:text-3xl mt-3 font-extrabold md:text-4.5xl">
              Travel <span className="italic-serif text-primary font-semibold">Smarter</span>{" "}
              Travel <span className="italic-serif font-semibold text-primary">Protected.</span>
            </h2>
            <p className="sm:mt-4 text-muted-foreground text-[.7rem] sm:text-sm md:text-sm sm:px-0 px-6">
              From Verified Visa Support To Secure Travel Guidance, <br /> Visa Guard Africa Helps
              Traveler Move Forward With Greater Confidence & Protection.
            </p>
          </div>
          <div className="mt-5 sm:mt-12 grid gap-5 md:grid-cols-4 md:grid-rows-2">
            {/* Large plane - spans 1 col, 2 rows */}
            <div className="relative overflow-hidden rounded-2xl md:col-span-2 md:row-span-2">
              <img
                src={PlaneAir}
                alt="Plane"
                className="h-full min-h-64 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
              <div className="absolute bottom-15 left-4 max-w-md text-white">
                <h3 className="text-sm tracking-tight md:text-2xl font-extrabold">
                  Your Trusted Travel Protection Partner
                </h3>
                <p className="mt-2 text-sm md:text-sm text-white/80">
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
              <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
              <div className="absolute bottom-10 left-2.5 text-white">
                <h3 className="text-sm tracking-tight md:text-2xl font-extrabold">Trusted Platform</h3>
                <p className="mt-1 text-sm md:text-sm text-white/80">
                  Built Around Transparency, Accountability, And Traveler Protection.
                </p>
              </div>
            </div>

            {/* Verified Agents - image card */}
            <div className="relative overflow-hidden rounded-2xl md:row-span-1">
              <img
                src={verified}
                alt="Verified Agents"
                className="h-full min-h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
              <div className="absolute bottom-10 left-2.5 text-white">
                <h3 className="text-sm tracking-tight md:text-2xl font-extrabold">Verified Agents</h3>
                <p className="mt-1 text-sm md:text-sm text-white/80">
                  Get Professional Assistance for a Safer, Secure, and Transparent Visa Application Process.
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
              <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
              <div className="absolute bottom-15 left-4 text-white">
                <h3 className="text-sm tracking-tight md:text-2xl font-extrabold">Global Travel</h3>
                <p className="mt-1 text-sm md:text-sm text-white/80">
                  Explore International Opportunities With <br /> Safer And More Trusted Travel
                  Support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST GRID */}
      <section className="bg-accent/40 md:py-20 py-5">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-xl mt-5 tracking-tight sm:text-3xl font-extrabold md:text-4xl">
              Built Around <span className="italic-serif text-primary">Trust</span> &{" "}
              <span className="italic-serif text-primary">Protection</span>
            </h2>
            <p className="sm:mt-3 text-[.7rem] sm:text-sm md:text-sm mx-auto max-w-xl text-muted-foreground capitalize">
              Visa Guard Africa combines verification, escrow protection, and transparent tracking
              to create a safer visa experience for Africans.
            </p>
          </div>

          {/* Sliding carousel — same behaviour across every screen size, no stacking */}
          <div
            className="relative mt-12"
            onMouseEnter={() => {
              if (autoTrustRef.current) clearInterval(autoTrustRef.current);
            }}
            onMouseLeave={startTrustAutoplay}
          >
            <div
              className="overflow-hidden touch-pan-y select-none"
              onTouchStart={handleTrustTouchStart}
              onTouchEnd={handleTrustTouchEnd}
            >
              <div
                className="flex"
                style={{
                  transform: `translateX(-${safeTrustIndex * 100}%)`,
                  transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {trustPages.map((group, i) => (
                  <div key={i} className="w-full shrink-0 px-1.5">
                    <div
                      className="grid gap-5"
                      style={{
                        gridTemplateColumns: `repeat(${trustPerView}, minmax(0, 1fr))`,
                      }}
                    >
                      {group.map((f) => (
                        <div
                          key={f.title}
                          className="relative flex h-full min-h-54 flex-col rounded-2xl border border-border bg-background p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/10 hover:shadow-sm"
                        >
                          <TrustCard f={f} agent1={agent1} agent2={agent2} agent3={agent3} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {trustTotal > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goToTrust(safeTrustIndex - 1)}
                  aria-label="Previous"
                  className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-md transition hover:border-primary/40 hover:text-primary sm:flex"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goToTrust(safeTrustIndex + 1)}
                  aria-label="Next"
                  className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-md transition hover:border-primary/40 hover:text-primary sm:flex"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {trustTotal > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {trustPages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToTrust(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === safeTrustIndex}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === safeTrustIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-border hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="md:py-20 py-5">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl tracking-tight text-balance mt-3 sm:text-3xl font-extrabold md:text-4xl">
              How It <span className="italic-serif text-primary">Works</span>
            </h2>
            <p className="mt-2 text-[.7rem] sm:text-sm md:text-sm text-muted-foreground">
              A simple, transparent, and secure process designed to protect travelers from fraud.
            </p>
            <ol className="mt-8 space-y-5">
              {[
                ["Find Verified Agent", "Browse vetted experts who match your visa goal."],
                ["Fund Through Escrow", "Pay safely - funds release only on milestone completion."],
                ["Process Approval And Tracking", "Watch real-time progress on your application."],
                ["Visa & Trip Done", "Travel with peace of mind, fully supported."],
                ["Complete Your Journey", "We stay with you through arrival and beyond."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4 items-center">
                  <span className="grid sm:h-9 sm:w-9 h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold tracking-tight text-sm sm:text-base">{t}</h4>
                    <p className="text-[.7rem] sm:text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative overflow-hidden rounded-3xl hidden md:flex">
            <img src={trusted} alt="" className="h-120 w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-15 left-8 right-8 text-white">
              <h3 className="md:text-3xl tracking-tight text-xl font-extrabold">Verified, Trusted, Secured.</h3>
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
      <section className="bg-accent/40 md:py-20 py-5">
        <div className="mx-auto max-w-7xl px-6 text-center sm:text-start">
          {/* <Pill text="Verified Marketplace" /> */}
          <h2 className="mt-5 text-xl tracking-tigh text-balancet sm:text-3xl font-extrabold md:text-4xl">
            Explore <span className="italic-serif text-primary">Trusted & Verified</span> <br />
            Visa Services And Agents.
          </h2>
          <p className="sm:mt-3 mt-2 text-[.7rem] sm:text-sm md:text-sm max-w-md text-muted-foreground">
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
          <div className="relative mt-5 md:hidden">
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
            <Link to="/process">
          <button className="mt-8 rounded-lg bg-primary px-6 py-3 text-xs md:text-sm w-full md:w-fit font-semibold text-primary-foreground hover:bg-primary/90">
            View Our Process
          </button></Link>
        </div>
      </section>

      {/* PAYMENTS BLOCK */}
      <section className="md:pt-20 pt-20 md:bg-accent/50 mx-5 md:mx-0">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl bg-accent/50 md:bg-transparent pt-10 px-6 md:grid-cols-2 md:pt-16 justify-center text-center md:text-start">
          <div>
            <h2 className="text-xl sm:text-3xl tracking-tight text-balance font-extrabold md:text-6xl">
              Your Payments Stay <span className="italic-serif text-primary">Secured</span> &{" "}
              <span className="italic-serif text-primary">Protected</span>
            </h2>
            <p className="md:mt-3 text-[.7rem] sm:text-xs md:text-sm leading-relaxed text-balance text-muted-foreground">
              Our escrow protection system helps create a transparent payment process by securely holding your funds until verified milestones are completed, protecting both travelers and trusted agents.
            </p>
            <button
              onClick={() => setDownload(true)}
              className="mt-2 sm:mt-6 rounded-lg bg-primary px-12 py-3 text-xs sm:text-sm text-primary-foreground hover:bg-primary/90"
            >
              Learn More
            </button>
          </div>
          <img src={singlePhone} alt="" className="mx-auto me-5 w-full max-w-md" loading="lazy" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center sm:text-start">
          {/* <Pill text="Frequently Asked Questions" /> */}
          <h2 className="mt-2 text-center text-balance text-xl tracking-tight sm:text-3xl font-extrabold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="sm:mt-4 text-[.7rem] text-balance sm:text-sm md:text-sm text-center text-muted-foreground">
            Browse Most Frequent questions From Travelers And Agents Using The Visa Guard Application
          </p>
          <div className="mt-5 sm:mt-10 space-y-3">
            {faqs.map((f, i) => (
              <FaqItem key={i} {...f} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-footer mx-5 sm:rounded-none rounded-md sm:mx-0 mb-20 py-10 sm:py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-xl sm:text-3xl tracking-tight font-extrabold md:text-4xl">
            Start Your Visa Journey Safely
          </h2>
          <p className="mt-3 mb-1 text-[.7rem] sm:text-xs md:text-sm text-white/70">
            Find verified visa professionals and process applications with greater confidence.
          </p>
          <WaitListPromo centered />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setDownload(true)}
              className="rounded-lg bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-foreground w-full md:w-fit"
            >
              Download the App
            </button>
            <Link
              to="/waitlist"
              className="flex justify-center items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-xs sm:text-sm font-semibold text-white  w-full md:w-fit hover:bg-white/10"
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
    <div className="">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm sm:text-sm gap-6 p-3 sm:p-5 text-left bg-[#F3F3F4] rounded-md mb-1"
      >
        <span className="font-medium">{q}</span>
        {open ? (
          <Minus className={`h-3 w-3 text-muted-foreground transition`} />
        ) : (
          <Plus className={`h-3 w-3 text-muted-foreground transition`} />
        )}
      </button>
      {open && (
        <p className="text-[.7rem] sm:text-sm text-muted-foreground text-start p-4 bg-[#f7f7f7] rounded-md ">
          {a}
        </p>
      )}
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
    <div className="flex h-full flex-col">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/90 text-white">
        <f.icon color="#fff" className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>

      {f.tag ? (
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[.65rem] font-medium text-primary md:text-xs">
            <CircleCheckBig size={10} /> {f.tag}
          </span>
          {f.tag1 && (
            <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[.65rem] font-medium text-primary md:text-xs">
              <CircleCheckBig size={10} /> {f.tag1}
            </span>
          )}
        </div>
      ) : (
        <div className="mt-auto flex w-fit items-center gap-3 pt-6">
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
          <span className="text-[.65rem] font-medium text-muted-foreground md:text-sm">
            VERIFIED AGENTS
          </span>
        </div>
      )}
    </div>
  );
}

function AgentCard({ agent }: { agent: (typeof agents)[0] }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-background">
      <img src={agent.img} alt={agent.name} className="h-80 w-full object-cover" loading="lazy" />
      <div className="sm:p-5 p-3 bg-[#FAFAFA]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold">{agent.name}</h4>
            <BadgeCheck fill="#28A745" className="h-5 w-5" color="#fff" />
          </div>
          <div className="text-right">
            <p className="text-[8px] sm:text-[10px] text-muted-foreground">Starting from</p>
            <p className="text-[.6rem] sm:text-xs font-bold text-primary">{agent.price}</p>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="sm:h-3.5 sm:w-3.5 h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-[.6rem] sm:text-xs md:text-sm text-foreground">
            {agent.rating}
          </span>
          <span className="text-[.6rem]">•</span>
          <span className="text-[.6rem] sm:text-xs md:text-sm">{agent.cases} successful cases</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {agent.tags.map((tag) => (
            <span key={tag} className="rounded bg-[#F3F3F4] px-2.5 py-0.5 text-[.7rem] sm:text-xs">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[.7rem] text-start sm:text-sm text-muted-foreground bg-white p-2 rounded">
          {agent.desc}
        </p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
          {[
            { Icon: ShieldCheck, text: "Escrow Protected" },
            { Icon: FileCheck, text: "NDPR Complaint" },
            { Icon: FileCheck, text: "Verified Documents" },
          ].map((i, idx) => (
            <span
              key={idx}
              className="flex items-center text-[.35rem] bg-[#F7F7F7] rouded-full sm:text-xs gap-1 p-1"
            >
              <i.Icon className="h-2 w-2" /> {i.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
