import { Download, X, Star } from "lucide-react";

export function DownloadAppDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-app-title"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-card text-center shadow-2xl ring-1 ring-black/5 animate-fade-in sm:max-w-md">
        {/* Top accent */}
        <div className="h-1.5 w-full from-primary via-primary/70 to-primary" />

        <div className="p-5 sm:p-8">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-md ring-4 ring-primary/10 sm:h-16 sm:w-16">
            <Download className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>

          <h3 id="download-app-title" className="mt-5 text-lg font-bold text-foreground sm:text-xl">
            Continue In App
          </h3>
          <p className="mx-auto mt-2.5 max-w-xs text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Download Visa Guard Africa to securely connect with verified agents and manage your visa
            journey safely.
          </p>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-0.5 text-yellow-500">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
            </div>
            <span>Trusted by 1,000+ travelers</span>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <button className="w-full rounded-xl bg-primary py-3 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:text-sm">
              Download App
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="w-full rounded-xl py-2.5 text-xs font-medium text-muted-foreground transition hover:text-foreground sm:text-sm"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
