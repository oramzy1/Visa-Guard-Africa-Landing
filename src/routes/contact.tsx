import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Mail, Phone, Send, Facebook, Instagram, Share2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact - Visa Guard Africa" },
      {
        name: "description",
        content:
          "Connect with our team for support, partnerships and questions about secure visa processing.",
      },
    ],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageLayout>
      <section className="bg-hero-cream">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary">
            • Contact Us
          </span>
          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            Need Help or <span className="italic-serif text-primary">Support?</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Connect With Our Team For Platform Support, Partnership Opportunities, Or Questions
            About Secure Visa Processing And Travel Protection Services.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[360px_1fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Email Us</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">support@visaguardafrica.com</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Call Center</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">+234 123 456 7899</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="font-bold">Our Social Handles</h3>
              <div className="mt-3 flex gap-3">
                {[Facebook, Instagram, Share2].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3000);
            }}
            className="rounded-2xl border border-border bg-accent/30 p-8"
          >
            <h2 className="text-2xl font-bold">Send Us Messages</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Full Name">
                <input required placeholder="e.g. Alex Chen" className="input" />
              </Field>
              <Field label="Company">
                <input placeholder="Company name (optional)" className="input" />
              </Field>
            </div>
            <Field label="Email Address" className="mt-5">
              <input type="email" required placeholder="alex@company.com" className="input" />
            </Field>
            <Field label="Subject of Inquiry" className="mt-5">
              <select className="input">
                <option>Subject</option>
                <option>Platform Support</option>
                <option>Partnership</option>
                <option>General</option>
              </select>
            </Field>
            <Field label="Your Message" className="mt-5">
              <textarea
                required
                rows={5}
                placeholder="How can we help you?"
                className="input resize-none"
              />
            </Field>
            <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto sm:px-10">
              {sent ? (
                "Sent ✓"
              ) : (
                <>
                  Send Now <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      <style>{`.input{width:100%;height:48px;border-radius:10px;border:1px solid var(--border);background:var(--background);padding:0 14px;font-size:14px;outline:none}.input:focus{border-color:var(--primary)}textarea.input{height:auto;padding:14px;}`}</style>
    </PageLayout>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground/70">
        {label}
      </span>
      {children}
    </label>
  );
}
