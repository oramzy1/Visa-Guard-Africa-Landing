import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Mail, Star, ShieldCheck, BadgeCheck } from "lucide-react";
import agent1 from "@/assets/agent-1.jpg";
import agent2 from "@/assets/agent-2.jpg";
import agent3 from "@/assets/agent-3.jpg";

export const Route = createFileRoute("/waitlist")({
  component: WaitlistPage,
  head: () => ({ meta: [{ title: "Join the Waitlist — Visa Guard Africa" }, { name: "description", content: "Be among the first travelers and verified agents to access a safer, more transparent visa platform." }] }),
});

function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageLayout>
      <section className="relative bg-hero-cream">
        <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
          {!submitted ? (
            <>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary">• Launching Soon</span>
              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                Get Early <span className="italic-serif text-primary">Access</span>, Join The Waitlist.
              </h1>
              <p className="mt-5 max-w-xl text-muted-foreground">
                Be among the first travelers and verified agents to access a safer, more transparent visa processing platform built to protect Africans from scams and insecure transactions.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img src={agent1} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />
                  <img src={agent2} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />
                  <img src={agent3} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />
                </div>
                <div className="flex text-yellow-500">
                  <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-sm text-muted-foreground">1000+ Users Already On Waitlist</span>
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to continue"
                    className="h-14 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary"
                  />
                </div>
                <button type="submit" className="h-14 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="w-full max-w-md rounded-2xl bg-background p-10 text-center shadow-xl animate-fade-in">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white">
                <BadgeCheck className="h-9 w-9" />
              </div>
              <h2 className="mt-5 text-2xl font-bold">You're On The Waitlist</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Thank you for joining the Visa Guard Africa waitlist. You'll be among the first to know when we launch.
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                Verify Before You Pay <ShieldCheck className="h-4 w-4 text-primary" />
              </p>
              <button
                onClick={() => { setSubmitted(false); setEmail(""); }}
                className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
