import { Image } from "@/components/ui/image";
import { Spark, Heart } from "@/components/Doodles";
import { IMAGES } from "@/data/menu";

const SHOTS = [
  { src: IMAGES.shaping, alt: "Loaves being shaped by hand before sunrise", caption: "Shaped by hand, five in the morning" },
  { src: IMAGES.croissantTray, alt: "A tray of croissants coming out of the deck oven", caption: "Out of the deck oven" },
  { src: IMAGES.hotChocolate, alt: "Cacao being ground for the first cup of the day", caption: "Cacao, ground in house" },
];

export default function Bakehouse() {
  return (
    <section className="border-y-2 border-cocoa bg-butter/30 py-14 max-md:py-10 lg:py-20">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">
            <Spark className="h-3 w-3 text-tang" strokeWidth={2.2} />
            From the bakehouse
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-black leading-[1.05] tracking-[-0.02em] text-cocoa">
            What a morning here{" "}
            <span className="italic text-bubblegum">looks like.</span>
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-cocoa/65">
            Flour on the counter, a tray out of the oven, cacao ground for the first cup — the same
            three things, every day.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {SHOTS.map((shot, index) => (
            <figure key={shot.caption} className="group">
              <div
                className={[
                  "relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border-2 border-cocoa bg-cream shadow-[5px_5px_0_0_#3D2B1F] transition-transform duration-300 group-hover:-translate-y-1",
                  index === 1 ? "sm:mt-8" : "",
                ].join(" ")}
              >
                <Image src={shot.src} alt={shot.alt} fittingType="fill" className="h-full w-full" />
              </div>
              <figcaption className="mt-3 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-cocoa/60">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-cocoa bg-cream font-display text-[9px] font-black text-cocoa">
                  {index + 1}
                </span>
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <blockquote className="mx-auto mt-12 max-w-2xl text-center">
          <Heart className="mx-auto h-5 w-5 text-bubblegum" />
          <p className="mt-3 font-display text-[clamp(1.35rem,3vw,2rem)] font-black italic leading-[1.2] text-cocoa">
            “Bread, butter, cacao — nothing more than what a morning needs.”
          </p>
          <footer className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-cocoa/45">
            Our story
          </footer>
        </blockquote>
      </div>
    </section>
  );
}