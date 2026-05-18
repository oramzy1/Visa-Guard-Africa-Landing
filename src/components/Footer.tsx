import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Share2, ShieldCheck } from "lucide-react";
import logo from "@/assets/vga-logo.png";

export function Footer() {
  return (
    <footer className="bg-brand-footer text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <img src={logo} alt="VGA" className="h-9 w-9 rounded-md" />
            <div>
              <div className="text-[15px] font-bold text-white">Visa Guard Africa</div>
              <div className="text-[10px] text-white/60">Protecting Africans from visa scams</div>
            </div>
          </div>
          <p className="max-w-xs text-xs sm:text-sm text-white/70">
            Helping Africans process visas more safely through verified professionals, secure escrow payments, and transparent travel support.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Share2].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-wider text-white">QUICK NAVIGATION</h4>
          <ul className="space-y-3 text-xs sm:text-sm">
            <li><Link to="/about" className="hover:text-white">• About Us</Link></li>
            <li><Link to="/process" className="hover:text-white">• Security</Link></li>
            <li><Link to="/contact" className="hover:text-white">• Support</Link></li>
            <li><a href="#" className="hover:text-white">• Cookies policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-wider text-white">SUPPORT</h4>
          <ul className="space-y-3 text-xs sm:text-sm">
            <li>• Frequently Asked Questions</li>
            <li>• Privacy policy</li>
            <li>• General terms and conditions</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-wider text-white">CONTACT</h4>
          <ul className="space-y-3 text-xs sm:text-sm">
            <li>• Email : support@visaguardafrica.com</li>
            <li>• Lagos, Nigeria,&nbsp;&nbsp; +234 1 123 4567 899</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-5 text-[.6rem] sm:text-xs text-white/60 md:flex-row md:items-center">
          <p>© 2026 <span className="underline">Visa Guard Africa Technologies LTD</span>. – All rights reserved.</p>
          <p className="flex items-center gap-1.5">Verify Before You Pay <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-primary" /></p>
        </div>
      </div>
    </footer>
  );
}
