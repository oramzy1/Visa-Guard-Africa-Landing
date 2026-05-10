import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import logo from "@/assets/vga-logo.png";

export function PageLoader() {
  const isLoading = useRouterState({ select: (s) => s.isLoading || s.isTransitioning });
  const [show, setShow] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initial mount: show briefly then hide
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);

  // React to navigations
  useEffect(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (isLoading) {
      setShow(true);
    } else {
      hideTimer.current = setTimeout(() => setShow(false), 600);
    }
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isLoading]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none">
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
