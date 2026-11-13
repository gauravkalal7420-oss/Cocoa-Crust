import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Heart, Spark, Squiggle } from "@/components/Doodles";
import { IMAGES } from "@/data/menu";

const TIMELINE = [
  { year: "2019", text: "A market stall, two trays of sourdough and a hand-written price card." },
  { year: "2021", text: "The deck oven arrives. We start baking before sunrise instead of at midnight." },
  { year: "2023", text: "Mews Lane opens: one long counter, a glass case and a few marble tables." },
  { year: "Today", text: "Six main items, baked daily, and a cacao bar ground in house." },
];

export default function Story() {
  return (
    <>
      <PageHero
        eyebrow="Our story · Est. 2019"
        title="Two bakers, one oven, and a starter"
        accent="fed every morning."
        description="We are a small bakery that has never wanted to be a big one. Everything on the counter is shaped by hand the day it is sold."
      />

      <section className="py-14 max-md:py-10 lg:py-20">
        <div className="shell grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="eyebrow">
              <Spark className="h-3 w-3 text-tang" strokeWidth={2.2} />
              Wheat, cacao and a loaf
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-black leading-[1.06] text-cocoa">
              The three things we have built
              <br />
              <span className="italic text-bubblegum">everything around.</span>
            </h2>
            <p className="mt-4 text-[15px] leading-[1.8] text-cocoa/70">
              Cocoa &amp; Crust began with a starter kept in a jam jar and a stubborn preference for
              slow dough. We mix in the evening, let the dough rest overnight, and shape by hand
              while the city is still quiet.
            </p>
            <p className="mt-3 text-[15px] leading-[1.8] text-cocoa/70">
              The bread is long-fermented — thirty-six hours from flour to counter — which is why the
              crust blisters and the crumb stays custardy for days. The pastries are laminated with
              cultured butter, folded and rested across three days. The cacao we grind ourselves, for
              the cakes and for the cups we hand over the counter.
            </p>
            <p className="mt-3 text-[15px] leading-[1.8] text-cocoa/70">
              Nothing is made ahead, nothing is frozen, and the menu stays short so that everything
              on it can be made well.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-2 border-cocoa bg-blush/40 shadow-[5px_5px_0_0_#3D2B1F]">
                <Image
                  src={IMAGES.shaping}
                  alt="A loaf being shaped by hand before sunrise"
                  fittingType="fill"
                  className="h-full w-full"
                />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-2 border-cocoa bg-butter/50 shadow-[5px_5px_0_0_#3D2B1F] sm:mt-6">
                <Image
                  src={IMAGES.starter}
                  alt="The starter, fed every morning since 2019"
                  fittingType="fill"
                  className="h-full w-full"
                />
              </figure>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.75rem] border-2 border-cocoa bg-card p-6 shadow-[6px_6px_0_0_#3D2B1F] sm:p-8">
              <p className="eyebrow">A short history</p>
              <h2 className="mt-4 font-display text-[26px] font-black text-cocoa">
                Stall · oven · shopfront · counter
              </h2>
              <ol className="mt-5 space-y-4">
                {TIMELINE.map((entry) => (
                  <li key={entry.year} className="flex gap-4 border-b border-cocoa/10 pb-4 last:border-0 last:pb-0">
                    <span className="font-display text-[15px] font-black text-bubblegum">{entry.year}</span>
                    <p className="text-[13.5px] leading-relaxed text-cocoa/70">{entry.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[1.75rem] border-2 border-cocoa bg-blush/60 p-6 shadow-[5px_5px_0_0_#3D2B1F] sm:p-8">
              <Heart className="h-5 w-5 text-bubblegum" />
              <p className="mt-3 font-display text-[19px] font-black italic leading-[1.3] text-cocoa">
                “We bake the amount one morning can make properly. When the case is empty, we clean
                down and start again tomorrow.”
              </p>
              <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.22em] text-cocoa/50">
                The two bakers
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link to="/menu" className="btn-funk">
                See the menu
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </Link>
              <Link to="/visit" className="btn-funk-ghost">
                Plan your visit
              </Link>
              <Squiggle className="h-3 w-24 self-center text-cocoa/25" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}