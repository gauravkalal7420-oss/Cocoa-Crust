import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
import { Squiggle } from "@/components/Doodles";

const explore = [
  { label: "Menu", to: "/menu" },
  { label: "Custom cakes", to: "/custom-cakes" },
  { label: "Our story", to: "/story" },
];

const findUs = [
  { label: "Visit", to: "/visit" },
  { label: "Contact", to: "/contact" },
  { label: "Your bag", to: "/cart" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-cocoa bg-cocoa text-cream">
      <div className="shell py-12 max-md:py-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="[&_.text-cocoa]:text-cream">
              <Logo size="lg" to="/" />
            </div>
            <p className="mt-4 max-w-sm text-[14px] leading-[1.7] text-cream/70">
              A small bakery on Mews Lane. Long-fermented bread, hand-laminated pastry and cacao
              ground in house — baked before sunrise, every morning but Monday.
            </p>
            <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.22em] text-butter/80">
              Est. 2019 · Bandra West
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-butter">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {explore.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[14px] text-cream/80 transition hover:text-bubblegum">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-butter">
              Find the bakery
            </h3>
            <ul className="mt-4 space-y-2.5">
              {findUs.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[14px] text-cream/80 transition hover:text-bubblegum">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-butter">
              Opening hours
            </h3>
            <dl className="mt-4 space-y-1.5 text-[13px] text-cream/80">
              <div className="flex justify-between gap-4">
                <dt>Tue – Fri</dt>
                <dd className="font-bold text-cream">7:30 – 18:00</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sat – Sun</dt>
                <dd className="font-bold text-cream">8:00 – 16:00</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Mon</dt>
                <dd className="font-bold text-cream">Closed</dd>
              </div>
            </dl>
            <div className="mt-5 space-y-2 text-[13px] text-cream/70">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-tang" />
                14 Mews Lane, Bandra West, Mumbai 400050
              </p>
              <a
                href="mailto:hello@cocoaandcrust.com"
                className="flex items-center gap-2 transition hover:text-bubblegum"
              >
                <Mail className="h-4 w-4 shrink-0 text-tang" />
                hello@cocoaandcrust.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-cream/15 pt-6 sm:flex-row sm:justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] text-cream/45">
            © 2026 Cocoa &amp; Crust Bakery
          </p>
          <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-cream/45">
            <Squiggle className="h-2.5 w-14 text-tang" />
            Mixed by hand · Baked before sunrise
            <Squiggle className="h-2.5 w-14 text-tang" />
          </p>
        </div>
      </div>
    </footer>
  );
}