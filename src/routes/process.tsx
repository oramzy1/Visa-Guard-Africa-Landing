import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Search, Lock, Activity, Plane, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({ meta: [{ title: "Our Process — Visa Guard Africa" }, { name: "description", content: "A simple, transparent end-to-end visa process built around trust and protection." }] }),
});

const steps = [
  { icon: Search, title: "Find a Verified Agent", desc: "Browse vetted visa experts matched to your destination and goal — UK, Canada, Schengen, USA and beyond." },
  { icon: Lock, title: "Fund Through Escrow", desc: "Pay safely. Your money sits in escrow and is released only when milestones are completed." },
  { icon: Activity, title: "Track In Real Time", desc: "Watch every step of your application live — documents, embassy steps, milestones and decisions." },
  { icon: ShieldCheck, title: "Stay Protected", desc: "Our scam-detection layer continuously monitors activity and flags risk for your safety." },
  { icon: Plane, title: "Travel with Peace of Mind", desc: "Once approved, we stay with you through arrival and onboarding in your destination." },
];

function ProcessPage() {
  return (
    <PageLayout>
      <section className="bg-hero-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary">• Our Process</span>
          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            A Safer Visa Journey, <span className="italic-serif text-primary">Step By Step.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Built around trust and protection — from finding a verified agent to landing safely abroad.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <ol className="relative space-y-10 border-l-2 border-dashed border-primary/30 pl-10">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="absolute -left-[51px] grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-bold">
                  {i + 1}
                </span>
                <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-brand-footer py-16 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to start safely?</h2>
          <p className="mt-3 text-white/70">Join thousands already on the waitlist to access verified visa experts.</p>
          <Link to="/waitlist" className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Join the Waitlist
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
