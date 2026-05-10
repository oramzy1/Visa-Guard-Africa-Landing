import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import logo from "@/assets/vga-logo.png";

export function PageLoader() {
  const status = useRouterState({ select: (s) => s.status });
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (status === "pending") {
      setShow(true);
    } else if (status === "idle") {
      const t = setTimeout(() => setShow(false), 700);
      return () => clearTimeout(t);
    }
  }, [status, mounted]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary/20 animate-brand-ring" />
        <span className="absolute inset-2 rounded-full bg-primary/15 animate-brand-ring [animation-delay:200ms]" />
        <img
          src={logo}
          alt="Loading"
          className="relative h-16 w-16 rounded-xl object-contain animate-brand-pulse"
        />
      </div>
    </div>
  );
}
