import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Spark } from "@/components/Doodles";
import { IMAGES } from "@/data/menu";

const HOURS = [
  { days: "Tuesday – Friday", time: "7:30am – 6:00pm" },
  { days: "Saturday – Sunday", time: "8:00am – 4:00pm" },
  { days: "Monday", time: "Closed — baking day" },
];

const NOTES = [
  "Breads come out from 7:30am, pastries through the morning.",
  "Whole cakes and extra loaves by order, a week ahead.",
  "No reservations — the tables turn quickly.",
];

export default function Visit() {
  return (
    <>
      <PageHero
        eyebrow="Find the bakery"
        title="A brown and cream awning"
        accent="on Mews Lane."
        description="Look for the chalkboard on the pavement. The window is filled with pastries, the door is usually propped open."
      >
        <span className="sticker mt-5 -rotate-2 bg-butter">
          <Spark className="h-2.5 w-2.5" strokeWidth={2.4} />
          Two minutes from the market crossing
        </span>
      </PageHero>

      <section className="py-14 max-md:py-10 lg:py-20">
        <div className="shell grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="space-y-5">
            <div className="rounded-[1.75rem] border-2 border-cocoa bg-card p-6 shadow-[6px_6px_0_0_#3D2B1F] sm:p-8">
              <h2 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-cocoa/50">
                Opening hours
              </h2>
              <dl className="mt-4 space-y-2.5">
                {HOURS.map((row) => (
                  <div
                    key={row.days}
                    className="flex items-baseline justify-between gap-4 border-b border-cocoa/10 pb-2.5 last:border-0 last:pb-0"
                  >
                    <dt className="text-[14px] text-cocoa/70">{row.days}</dt>
                    <dd className="font-display text-[15px] font-black text-cocoa">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-[1.75rem] border-2 border-cocoa bg-butter/40 p-6 shadow-[5px_5px_0_0_#3D2B1F] sm:p-8">
              <h2 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-cocoa/50">
                Address
              </h2>
              <p className="mt-3 flex items-start gap-2 font-display text-[19px] font-black leading-snug text-cocoa">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-bubblegum" />
                14 Mews Lane, Bandra West
                <br />
                Mumbai 400050
              </p>
              <p className="mt-2 text-[13px] text-cocoa/60">Next to the old tailor&apos;s shop.</p>
              <a
                href="https://maps.google.com/?q=14+Mews+Lane+Bandra+West+Mumbai"
                target="_blank"
                rel="noreferrer"
                className="btn-funk-ghost mt-4"
              >
                Open in Google Maps
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </a>
            </div>

            <div className="rounded-[1.75rem] border-2 border-cocoa bg-blush/55 p-6 shadow-[5px_5px_0_0_#3D2B1F] sm:p-8">
              <h2 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-cocoa/50">
                Get in touch
              </h2>
              <a
                href="mailto:hello@cocoaandcrust.com"
                className="mt-3 flex items-center gap-2 font-display text-[17px] font-black text-cocoa transition hover:text-bubblegum"
              >
                <Mail className="h-4 w-4 text-bubblegum" />
                hello@cocoaandcrust.com
              </a>
              <p className="mt-2 text-[13px] leading-relaxed text-cocoa/65">
                For whole cakes, larger orders and anything else — write to us and we will reply the
                same week.
              </p>
              <Link to="/contact" className="btn-funk mt-4">
                Write to us
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border-2 border-cocoa bg-blush/40 shadow-[6px_6px_0_0_#3D2B1F]">
              <Image
                src={IMAGES.shopfront}
                alt="The Cocoa & Crust shopfront on Mews Lane"
                fittingType="fill"
                className="h-full w-full"
              />
              <span className="sticker absolute bottom-4 left-4 bg-cream">Closed Mondays</span>
            </figure>

            <div className="rounded-[1.75rem] border-2 border-cocoa bg-card p-6 shadow-[5px_5px_0_0_#3D2B1F] sm:p-8">
              <p className="eyebrow">
                <Spark className="h-3 w-3 text-tang" strokeWidth={2.2} />
                Good to know
              </p>
              <ul className="mt-4 space-y-3">
                {NOTES.map((note) => (
                  <li key={note} className="flex gap-3 text-[13.5px] leading-relaxed text-cocoa/70">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-bubblegum" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}