import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { DownloadAppDialog } from "@/components/DownloadAppDialog";
import { ShieldCheck, Lock, Wallet, FileCheck, Activity, Users, Star } from "lucide-react";
import worldMap from "@/assets/world-map.jpg";
import founder from "@/assets/founder.jpg";
import agent1 from "@/assets/agent-1.jpg";
import agent2 from "@/assets/agent-2.jpg";
import agent3 from "@/assets/agent-3.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "About — Visa Guard Africa" }, { name: "description", content: "Built from real experience. Designed to protect millions of African travelers from visa scams." }] }),
});

const features = [
  { icon: Users, title: "Verified Agents", desc: "Every visa agent is reviewed and verified before operating on the platform.", tag: "Verified Agents" },
  { icon: ShieldCheck, title: "Scam Detection", desc: "Every feature is designed to improve transparency, accountability and traveler safety.", tag: "Real-Time Tracking" },
  { icon: Lock, title: "Secure Transaction", desc: "All payments and sensitive information are securely processed and protected.", tag: "Verified Payment Gateway" },
  { icon: Wallet, title: "Escrow Protection", desc: "Payments remain protected until agreed milestones are completed.", tag: "Escrow Backed" },
  { icon: FileCheck, title: "NDPR Compliance", desc: "Personal data is handled per NDPR compliance standards.", tag: "NDPR Guidance" },
  { icon: Activity, title: "Real Time Tracking", desc: "Track visa progress, milestones and updates directly within the app.", tag: "Live Status" },
];

function AboutPage() {
  const [dl, setDl] = useState(false);
  return (
    <PageLayout>
      <section className="bg-hero-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary">• Our Story</span>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Built From <span className="italic-serif text-primary">Real Experience</span><br/>Designed to Protect <span className="italic-serif text-primary">Millions</span>
            </h1>
            <p className="text-muted-foreground">Visa Guard Africa Technologies LTD was created to help Africans avoid visa and relocation scams through trust, transparency, and technology-driven protection.</p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img src={agent1} alt="" className="h-7 w-7 rounded-full border-2 border-background object-cover" />
                <img src={agent2} alt="" className="h-7 w-7 rounded-full border-2 border-background object-cover" />
                <img src={agent3} alt="" className="h-7 w-7 rounded-full border-2 border-background object-cover" />
              </div>
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span className="text-sm text-muted-foreground">1000+ Users Already On Waitlist</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setDl(true)} className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Download App</button>
              <Link to="/waitlist" className="rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent">Join the Waitlist</Link>
            </div>
          </div>
          <div className="rounded-3xl bg-emerald-50 p-6">
            <img src={worldMap} alt="World" className="h-full w-full object-contain" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl bg-primary text-primary-foreground">
            <div className="grid items-center gap-8 p-8 md:grid-cols-[280px_1fr] md:p-12">
              <div className="overflow-hidden rounded-2xl">
                <img src={founder} alt="Founder" className="h-80 w-full object-cover" loading="lazy" />
                <div className="bg-primary py-2 text-center text-sm font-semibold">Mr. Chukwudi Eze · (Founder)</div>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">Founder Story</p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">Turning Pain Into Purpose</h2>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85">
                  <strong>Visa Guard Africa Technologies</strong> was founded by <strong>Chukwudi Eze</strong> after personally experiencing the devastating impact of visa and relocation scams. Like many Africans pursuing opportunities abroad, he trusted the wrong people, lost money, faced betrayal, and endured moments of uncertainty that could have derailed his dreams. Instead of allowing those experiences to define him, he chose to build a solution to protect others from the same pain. Through embassies, immigration authorities and law enforcement organizations, he discovered a major gap in the African travel industry — the absence of a trusted, technology-driven system focused on transparency, accountability, and traveler protection. That realization became the foundation of Visa Guard Africa Technologies LTD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-semibold text-primary">• The Vision</span>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Building Africa's<br/><span className="italic-serif text-primary">Travel Protection</span> Ecosystem
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Today, Visa Guard Africa is building a secure ecosystem designed to protect travelers while helping verified professionals build trust and credibility. The platform combines technology, verification, secure payments and transparent communication to create a safer visa and relocation experience across Africa.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-background p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                <span className="mt-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-accent/40 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary">• Our Mission</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl italic-serif">"More Than Technology"</h2>
            <p className="mt-4 text-muted-foreground">For Visa Guard Africa, this is more than a digital platform. It is a mission to protect people from losing their dreams, money, and future to scams while creating safer pathways to global opportunities for Africans everywhere.</p>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <img src={founder} alt="" className="h-96 w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-footer py-16 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Start Your Visa Journey Safely</h2>
          <p className="mt-3 text-white/70">Find verified visa professionals and process applications with greater confidence.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => setDl(true)} className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-foreground">Download the App</button>
            <Link to="/waitlist" className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Join Waitlist</Link>
          </div>
        </div>
      </section>
      <DownloadAppDialog open={dl} onOpenChange={setDl} />
    </PageLayout>
  );
}
