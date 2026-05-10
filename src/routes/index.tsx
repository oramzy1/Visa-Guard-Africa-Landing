import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { DownloadAppDialog } from "@/components/DownloadAppDialog";
import {
  ShieldCheck, Lock, Wallet, FileCheck, Activity, AlertTriangle,
  ChevronDown, Star, ArrowRight,
} from "lucide-react";
import heroPhones from "@/assets/hero-phones.png";
import planeFront from "@/assets/plane-front.jpg";
import planeSky from "@/assets/plane-sky.jpg";
import agent1 from "@/assets/agent-1.jpg";
import agent2 from "@/assets/agent-2.jpg";
import agent3 from "@/assets/agent-3.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const trustFeatures = [
  { icon: ShieldCheck, title: "Verified Agents", desc: "Real visa pros vetted before listing on the platform.", tag: "Verified Profiles" },
  { icon: Lock, title: "Escrow Protection", desc: "Funds held safely until milestones are completed.", tag: "Milestone Released" },
  { icon: Wallet, title: "Secure Transaction", desc: "Encrypted payments and bank-grade processing.", tag: "Bank-Grade Encryption" },
  { icon: FileCheck, title: "NDPR Compliance", desc: "Your data handled per Nigeria's data protection rules.", tag: "Data Protected" },
  { icon: Activity, title: "Real Time Tracking", desc: "See updates, milestones and status in real time.", tag: "Live Progress" },
  { icon: AlertTriangle, title: "Scam Detection", desc: "Behavior signals flag risky activity for traveler safety.", tag: "Safety First" },
];

const agents = [
  { name: "Sarah Johnson", role: "UK · Schengen Specialist", price: "₦150,000", img: agent1 },
  { name: "Jennifer Sharon", role: "Canada · Study Visa", price: "₦180,000", img: agent2 },
  { name: "Alex O. Johnson", role: "USA · Business Visa", price: "₦200,000", img: agent3 },
];

const faqs = [
  {
    q: "What is Visa Guard Africa exactly about?",
    a: "Visa Guard Africa is a trust-first visa platform that connects African travelers with verified visa professionals, secured by escrow payments and transparent milestone tracking — built specifically to prevent scams and accountability gaps.",
  },
  { q: "How do I sign up?", a: "Download the app and complete a short onboarding to verify your identity. You'll be matched with verified agents in minutes." },
  { q: "What makes you trusted?", a: "Every agent is reviewed and verified. Funds sit in escrow until milestones complete, and our scam detection layer monitors activity continuously." },
  { q: "Can I track my visa journey?", a: "Yes. Every milestone, document and message is tracked live inside the app." },
  { q: "Is my data protected?", a: "Absolutely. We are NDPR-compliant and use bank-grade encryption for everything." },
];

function HomePage() {
  const [download, setDownload] = useState(false);

  return (
    <PageLayout>
      {/* HERO */}
      <section className="bg-hero-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="space-y-7">
            <h1 className="text-4xl font-bold leading-[1.1] text-foreground md:text-6xl">
              Connect With <span className="italic-serif text-primary">Trusted</span>
              {" "}& <span className="italic-serif text-primary">Verified</span> Visa Experts Across Africa.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Visa Guard Africa Helps Travelers Avoid Scams Through Verified Agents, Secure Escrow Payments, And Transparent Application Tracking.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setDownload(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <ShieldCheck className="h-4 w-4" /> Download App
              </button>
              <Link
                to="/waitlist"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 text-sm font-semibold transition hover:bg-accent"
              >
                Join the Waitlist
              </Link>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                <img src={agent1} alt="" className="h-7 w-7 rounded-full border-2 border-background object-cover" />
                <img src={agent2} alt="" className="h-7 w-7 rounded-full border-2 border-background object-cover" />
                <img src={agent3} alt="" className="h-7 w-7 rounded-full border-2 border-background object-cover" />
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
              </div>
              <span className="text-sm text-muted-foreground">1000+ Users Already On Waitlist</span>
            </div>
          </div>
          <div className="relative">
            <img src={heroPhones} alt="App preview" className="mx-auto w-full max-w-lg" />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border/40 bg-background py-4 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm font-medium text-muted-foreground">
          Verification · Escrow Protection · Transparent Tracking · Create A Safer Visa Experience
        </div>
      </div>

      {/* TRAVEL SMARTER */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-5xl">
              Travel <span className="italic-serif text-primary">Smarter.</span> Travel <span className="italic-serif text-primary">Protected.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Verified visa services. Real-time tracking. Trusted partnerships.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl md:row-span-2 md:col-span-2">
              <img src={planeFront} alt="Plane" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 max-w-md text-white">
                <h3 className="text-2xl font-bold">Your Trusted Travel Protection Partner</h3>
                <p className="mt-2 text-sm text-white/80">Combining trust, verification, and technology to secure every step of your visa journey.</p>
              </div>
            </div>
            <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
              <h3 className="text-xl font-bold">Trusted Platform</h3>
              <p className="mt-2 text-sm text-primary-foreground/80">A reliable, transparent platform vetted to keep travelers protected.</p>
            </div>
            <div className="rounded-2xl bg-accent p-6">
              <h3 className="text-xl font-bold text-primary">Visa Support</h3>
              <p className="mt-2 text-sm text-muted-foreground">Real assistance from verified professionals every step of the way.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl">
              <img src={planeSky} alt="" className="h-56 w-full object-cover" loading="lazy" />
            </div>
            <div className="rounded-2xl bg-accent/60 p-6">
              <h3 className="text-xl font-bold text-primary">Global Travel</h3>
              <p className="mt-2 text-sm text-muted-foreground">Apply for visas across the globe with confidence and peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST GRID */}
      <section className="bg-accent/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Built Around <span className="italic-serif text-primary">Trust</span> & <span className="italic-serif text-primary">Protection</span>
            </h2>
            <p className="mt-3 mx-auto max-w-xl text-muted-foreground">Verification. Escrow. Live tracking. Defining the safer visa journey.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-background p-6 transition hover:shadow-lg">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                <span className="mt-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">{f.tag}</span>
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
            <p className="mt-3 text-muted-foreground">A simple, transparent, end-to-end process designed to protect travelers from end to end.</p>
            <ol className="mt-8 space-y-5">
              {[
                ["Find Verified Agent", "Browse vetted experts who match your visa goal."],
                ["Fund Through Escrow", "Pay safely — funds release only on milestone completion."],
                ["Process Approval And Tracking", "Watch real-time progress on your application."],
                ["Visa & Trip Done", "Travel with peace of mind, fully supported."],
                ["Complete Your Journey", "We stay with you through arrival and beyond."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
                  <div>
                    <h4 className="font-semibold">{t}</h4>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative overflow-hidden rounded-3xl">
            <img src={planeSky} alt="" className="h-[480px] w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-2xl font-bold">Protecting Africans From Visa Scams</h3>
              <p className="mt-2 text-sm text-white/80">Visa Guard Africa is more than a service — it's a movement to make travel safer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AGENTS */}
      <section className="bg-accent/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold md:text-4xl">
            Explore <span className="italic-serif text-primary">Trusted</span> & <span className="italic-serif text-primary">Verified</span> Visa Services And Agents.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Connect with verified visa professionals offering UK, Schengen, USA, Canada and study/business migration support.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {agents.map((a) => (
              <div key={a.name} className="overflow-hidden rounded-2xl border border-border bg-background">
                <img src={a.img} alt={a.name} className="h-64 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold">{a.name}</h4>
                    <span className="text-sm font-semibold text-primary">{a.price}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{a.role}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-accent px-3 py-1 text-xs">Verified</span>
                    <span className="rounded-full bg-accent px-3 py-1 text-xs">★ 4.9</span>
                  </div>
                  <button className="mt-4 w-full rounded-lg border border-border py-2 text-sm font-semibold hover:bg-accent">View Profile</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENTS BLOCK */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl bg-accent/50 p-10 px-6 md:grid-cols-2 md:p-16">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Your Payments Stay <span className="italic-serif text-primary">Secured</span> & <span className="italic-serif text-primary">Protected</span></h2>
            <p className="mt-3 text-muted-foreground">Funds are held safely in escrow and released as your visa milestones are completed.</p>
            <button onClick={() => setDownload(true)} className="mt-6 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Learn More</button>
          </div>
          <img src={heroPhones} alt="" className="mx-auto w-full max-w-md" loading="lazy" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Support / Contact</p>
          <h2 className="mt-2 text-center text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-3 text-center text-muted-foreground">Everything you need to know about working with verified visa agents.</p>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => <FaqItem key={i} {...f} defaultOpen={i === 0} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-footer py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Start Your Visa Journey Safely</h2>
          <p className="mt-3 text-white/70">Find verified visa professionals and process applications with greater confidence.</p>
          <div className="mt-5 flex justify-center gap-2 text-yellow-400">
            <Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" />
          </div>
          <p className="mt-1 text-sm text-white/70">1000+ Users Already On Waitlist</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => setDownload(true)} className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-foreground">Download the App</button>
            <Link to="/waitlist" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Join Waitlist <ArrowRight className="h-4 w-4" />
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
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
        <span className="font-semibold">{q}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-5 pb-5 text-sm text-muted-foreground">{a}</p>}
    </div>
  );
}
