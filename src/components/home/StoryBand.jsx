import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/data/menu";

export default function StoryBand() {
  return (
    <section className="py-14 max-md:py-10 lg:py-20">
      <div className="shell grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="relative">
          <span className="sticker absolute -left-3 -top-4 z-10 -rotate-6 bg-butter">Est. 2019</span>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border-2 border-cocoa bg-blush/40 shadow-[6px_6px_0_0_#3D2B1F] sm:aspect-[5/4]">
            <Image
              src={IMAGES.interior}
              alt="The bakery interior on Mews Lane"
              fittingType="fill"
              className="h-full w-full"
            />
          </figure>
        </div>

        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-black leading-[1.02] tracking-[-0.02em] text-cocoa">
            Mixed by hand.
            <br />
            <span className="italic text-bubblegum">Baked before sunrise.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.8] text-cocoa/70">
            Two bakers, one deck oven and a starter that has been fed every morning since 2019. We
            bake only what we can shape by hand — slowly fermented dough, butter folded in thin
            sheets, and cacao we grind ourselves.
          </p>
          <p className="mt-3 text-[15px] leading-[1.8] text-cocoa/70">
            Nothing is made ahead and nothing is frozen. The menu stays short so that everything on
            it can be made well.
          </p>
          <Link to="/story" className="btn-funk mt-7">
            Read our story
            <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
          </Link>
        </div>
      </div>
    </section>
  );
}