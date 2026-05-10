import logo from "@/assets/vga-logo.png";
import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img src={logo} alt="Visa Guard Africa" className="h-10 w-10 rounded-md object-contain" />
      <div className="leading-tight">
        <div className="text-[15px] font-bold text-primary">Visa Guard Africa</div>
        <div className="text-[10px] text-muted-foreground">Protecting Africans from visa scams</div>
      </div>
    </Link>
  );
}
