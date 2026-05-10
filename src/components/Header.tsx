import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { DownloadAppDialog } from "./DownloadAppDialog";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/process", label: "Our Process" },
  { to: "/waitlist", label: "Waitlists" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-cream/85 backdrop-blur border-b border-border/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-foreground/70 transition-colors hover:text-primary [&.active]:text-primary [&.active]:font-semibold [&.active]:underline [&.active]:underline-offset-8 [&.active]:decoration-2"
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <button
            onClick={() => setShowDownload(true)}
            className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Get Started Now
          </button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/40 bg-brand-cream md:hidden">
          <div className="flex flex-col gap-1 p-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-2 text-sm text-foreground/80 hover:bg-accent [&.active]:text-primary [&.active]:font-semibold"
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { setShowDownload(true); setOpen(false); }}
              className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Get Started Now
            </button>
          </div>
        </div>
      )}
      <DownloadAppDialog open={showDownload} onOpenChange={setShowDownload} />
    </header>
  );
}
