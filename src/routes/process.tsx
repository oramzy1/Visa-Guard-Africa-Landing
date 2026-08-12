import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Search, Lock, Activity, Plane, ShieldCheck, CircleCheckBig } from "lucide-react";
import Pill from "@/components/Pill";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({
    meta: [
      { title: "Our Process - Visa Guard Africa" },
      {
        name: "description",
        content: "A simple, transparent end-to-end visa process built around trust and protection.",
      },
    ],
  }),
});

const steps = [
  {
    icon: Search,
    title: "Find a Verified Agent",
    tag: "Trusted Professionals",
    desc: "We connect you with verified visa professionals who have successfully completed our identity and compliance checks before offering services on the platform.",
  },
  {
    icon: Lock,
    title: "Secure Your Service",
    tag: "Escrow Protected",
    desc: "Pay your agent's service fee securely through escrow. Funds are released only after agreed service milestones have been completed and verified.",
  },
  {
    icon: Activity,
    title: "Track Your Journey",
    tag: "Full Transparency",
    desc: "Stay informed with real-time updates on your application progress, submitted documents, completed milestones, and agent activities-all in one secure dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Travel With Confidence",
    tag: "Protection First",
    desc: "Our verification and risk monitoring systems help identify suspicious activity, promoting a safer and more transparent experience for both travelers and agents.",
  },
  {
    icon: Plane,
    title: "Access Official Resources",
    tag: "Verified Links",
    desc: "Access trusted embassy portals and airline resources through verified links provided within the platform, helping you avoid fraudulent websites and misinformation.",
  },
];

const trustBadges = [
  { icon: CircleCheckBig, text: "100% Verified Agents" },
  { icon: Lock, text: "Escrow Protected" },
  { icon: ShieldCheck, text: "Continuously Monitored" },
];

function ProcessPage() {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="bg-hero-cream">
        <div className="mx-auto mt-7 max-w-4xl px-6 py-13 text-center md:py-24">
          <Pill text="Step by Step Process on How it Works" />
          <h1 className="text-3xl mt-2 font-bold text-balance tracking-tight leading-tight sm:text-4xl md:text-6xl">
            A Safer Visa Journey, <span className="italic-serif text-primary">Step By Step.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-sm text-muted-foreground md:text-base">
            At our core, we do one thing exceptionally well: connect travelers with visa agents
            we've personally vetted and verified, then keep every step of that engagement protected.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {trustBadges.map((t) => (
              <span
                key={t.text}
                className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
              >
                <t.icon className="h-3.5 w-3.5 text-primary" /> {t.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Left-aligned section header */}
          <div className="max-w-2xl text-start">
            <Pill text="Quick Steps on How It Works" />
            <h2 className="mt-4 text-2xl tracking-tight text-balance font-bold sm:text-3xl md:text-4xl">
              We Connect You With{" "}
              <span className="italic-serif text-primary">Trusted & Verified</span> Agents.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Our role is simple: match every traveler with a visa professional we've personally
              verified, then protect that relationship from first contact to final approval. Every
              stage below exists to keep you safe.
            </p>
          </div>

          {/* Steps */}
          <div className="relative mt-12 md:mt-14">
            <div
              className="absolute left-5 top-2 bottom-2 w-px bg-linear-to-b from-transparent via-border to-transparent md:left-6"
              aria-hidden="true"
            />

            <ol className="space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} className="relative list-none">
                  <div className="flex gap-5 md:gap-6">
                    <div className="relative z-10 shrink-0">
                      <span className="grid h-10 w-10 place-items-center rounded-full border-4 border-background bg-primary text-sm font-bold text-primary-foreground shadow-sm md:h-12 md:w-12">
                        {i + 1}
                      </span>
                    </div>

                    <div className="flex-1 rounded-2xl border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/10 hover:shadow-sm">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <s.icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-md font-bold text-balance leading-tight">
                            {s.title}
                          </h3>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[.65rem] font-medium text-primary md:text-xs">
                          <CircleCheckBig size={10} /> {s.tag}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-footer mb-5 py-10 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">Ready to Start Safely?</h2>
          <p className="mt-3 max-w-4xl text-white/70">
            Download on Google Play to access verified visa professionals, secure escrow protection,
            and transparent application tracking.{" "}
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-primary tracking-tight px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Get The Visa Guard App
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
