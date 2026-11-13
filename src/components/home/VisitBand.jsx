import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Spark } from "@/components/Doodles";
import { IMAGES } from "@/data/menu";

const HOURS = [
  { days: "Tuesday – Friday", time: "7:30am – 6:00pm" },
  { days: "Saturday – Sunday", time: "8:00am – 4:00pm" },
  { days: "Monday", time: "Closed — baking day" },
];

export default function VisitBand() {
  return (
    <section className="py-14 max-md:py-10 lg:py-20">
      <div className="shell grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow">
            <Spark className="h-3 w-3 text-tang" strokeWidth={2.2} />
            Look for the chalkboard
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-black leading-[1.05] tracking-[-0.02em] text-cocoa">
            A small shopfront on
            <br />
            <span className="italic text-bubblegum">Mews Lane.</span>
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-cocoa/70">
            Come for the first bake at half past seven. Tables inside, a bench outside, and a
            chalkboard that tells you what is still warm.
          </p>

          <div className="mt-7 rounded-[1.75rem] border-2 border-cocoa bg-card p-6 shadow-[5px_5px_0_0_#3D2B1F]">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-cocoa/50">
              Opening hours
            </h3>
            <dl className="mt-3 space-y-2">
              {HOURS.map((row) => (
                <div
                  key={row.days}
                  className="flex items-baseline justify-between gap-4 border-b border-cocoa/10 pb-2 last:border-0 last:pb-0"
                >
                  <dt className="text-[14px] text-cocoa/70">{row.days}</dt>
                  <dd className="font-display text-[15px] font-black text-cocoa">{row.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 flex items-start gap-2 text-[13px] text-cocoa/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bubblegum" />
              14 Mews Lane, Bandra West
              <br />
              Mumbai 400050
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=14+Mews+Lane+Bandra+West+Mumbai"
                target="_blank"
                rel="noreferrer"
                className="btn-funk-ghost"
              >
                Open in Google Maps
              </a>
              <Link to="/contact" className="btn-funk-ghost">
                Get in touch
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </Link>
            </div>
          </div>
        </div>

        <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border-2 border-cocoa bg-blush/40 shadow-[6px_6px_0_0_#3D2B1F] lg:mt-6">
          <Image
            src={IMAGES.shopfront}
            alt="The Cocoa & Crust shopfront on Mews Lane"
            fittingType="fill"
            className="h-full w-full"
          />
          <span className="sticker absolute bottom-4 left-4 bg-cream">Mon closed · Tue – Sun open</span>
        </figure>
      </div>
    </section>
  );
}