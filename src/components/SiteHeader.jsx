import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useCart } from "@/lib/CartContext";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Menu", to: "/menu" },
  { label: "Custom cakes", to: "/custom-cakes" },
  { label: "Our story", to: "/story" },
  { label: "Visit", to: "/visit" },
  { label: "Contact", to: "/contact" },
];

export default function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-cocoa bg-cream/95 backdrop-blur-md">
      <div className="shell flex h-[68px] items-center justify-between gap-4 max-md:gap-2 sm:h-[76px]">
        <Logo size="md" withSpark />

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "text-[11px] font-extrabold uppercase tracking-[0.16em] transition-colors hover:text-bubblegum",
                  isActive ? "text-bubblegum" : "text-cocoa/70"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/account"
            aria-label="Your account"
            className="hidden h-10 w-10 items-center justify-center rounded-full border-2 border-cocoa bg-cream text-cocoa transition hover:bg-butter sm:flex"
          >
            <UserRound className="h-4 w-4" strokeWidth={2.2} />
          </Link>

          <Link
            to="/cart"
            className="relative flex h-10 items-center gap-2 rounded-full border-2 border-cocoa bg-bubblegum px-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-cream shadow-[3px_3px_0_0_#3D2B1F] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#3D2B1F]"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={2.4} />
            <span className="hidden sm:inline">Bag</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cream px-1 text-[11px] font-black text-cocoa">
              {count}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cocoa bg-cream text-cocoa lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-cocoa/40 backdrop-blur-sm"
          />
          <div className="absolute inset-x-3 top-3 rounded-[1.75rem] border-2 border-cocoa bg-cream p-6 shadow-[6px_6px_0_0_#3D2B1F]">
            <div className="flex items-center justify-between">
              <Logo size="sm" to="/" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-cocoa bg-butter text-cocoa"
              >
                <X className="h-4 w-4" strokeWidth={2.6} />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="border-b-2 border-cocoa/10 py-3 font-display text-[24px] font-black text-cocoa"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="py-3 font-display text-[24px] font-black text-cocoa"
              >
                Your account
              </Link>
            </nav>
            <div className="mt-5 flex items-center gap-3">
              <Link to="/menu" onClick={() => setOpen(false)} className="btn-funk flex-1">
                Explore the menu
              </Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="btn-funk-ghost">
                Bag {count}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}