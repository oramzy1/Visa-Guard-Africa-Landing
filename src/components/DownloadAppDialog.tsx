import { Download, X } from "lucide-react";

export function DownloadAppDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={() => onOpenChange(false)} />
      <div className="relative w-full max-w-sm rounded-2xl bg-card p-8 text-center shadow-2xl animate-fade-in">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-accent"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
          <Download className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-xl font-bold">Continue In App</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Download Visa Guard Africa to securely connect with verified agents and manage your visa journey safely.
        </p>
        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Download App
          </button>
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-lg border border-border bg-background py-3 text-sm font-semibold hover:bg-accent"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
