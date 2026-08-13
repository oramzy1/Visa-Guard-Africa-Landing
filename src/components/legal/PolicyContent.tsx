import type { ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-border pb-8 last:border-b-0">
      <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h4 className="mt-2 text-sm font-semibold text-foreground">{children}</h4>;
}

export function Body({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{children}</p>
  );
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      <span>{children}</span>
    </li>
  );
}

export function NumberedStep({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/90 text-[.7rem] font-semibold text-white">
        {index}
      </span>
      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}