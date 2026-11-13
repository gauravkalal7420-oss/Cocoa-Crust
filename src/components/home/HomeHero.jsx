import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowRight } from "lucide-react";
import { Spark, Squiggle } from "@/components/Doodles";
import { IMAGES } from "@/data/menu";

const HEADLINE = "Baked before sunrise.";

const PHOTOS = [
  { src: IMAGES.croissantTray, alt: "Trays of butter croissants out of the deck oven", wide: true },
  { src: IMAGES.layerCake, alt: "A dark cocoa layer cake on a cake stand", drop: true },
  { src: IMAGES.hotChocolate, alt: "A cup of single-origin hot chocolate on a marble table" },
];

export default function HomeHero() {
  const words = HEADLINE.split(" ");
  let letter = 0;

  return (
    <section className="relative overflow-hidden bg-background pt-10 max-md:pt-7 sm:pt-14">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blush/70 blur-2xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-butter/60 blur-2xl" />

      <div className="shell relative">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow hero-rise">
            <Spark className="h-3 w-3 text-tang" strokeWidth={2} />
            Est. 2019 · Bakery &amp; café
          </p>

          <h1 className="hero-rise mt-7 max-w-4xl text-balance font-display text-[clamp(2.6rem,7vw,5rem)] font-black leading-[0.98] tracking-[-0.03em] text-cocoa max-md:mt-5 max-md:text-[clamp(2.25rem,9vw,2.9rem)] max-md:leading-[1.02]">
            {words.map((word, wi) => (
              <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
                {word.split("").map((char) => {
                  const i = letter++;
                  return (
                    <span key={i} className="hero-letter" style={{ "--i": i }}>
                      {char}
                    </span>
                  );
                })}
                {wi < words.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </h1>

          <div className="hero-rise mt-4 flex items-center justify-center gap-3 text-tang">
            <Squiggle className="h-3 w-16" />
            <Spark className="h-4 w-4" strokeWidth={1.8} />
            <Squiggle className="h-3 w-16" />
          </div>

          <p className="hero-rise mt-5 max-w-xl text-[15px] leading-[1.7] text-cocoa/70 sm:text-[17px]">
            Long-fermented breads, hand-laminated pastries and cacao-rich cakes. Everything is mixed
            by hand on Mews Lane, and on the counter while it is still warm.
          </p>

          <div className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-3 max-md:mt-6 max-md:w-full max-md:flex-col">
            <Link
              to="/menu"
              className="group inline-flex items-stretch overflow-hidden rounded-full border-2 border-cocoa bg-bubblegum text-cream shadow-[5px_5px_0_0_#3D2B1F] transition-all duration-200 hover:-translate-y-0.5 hover:bg-tang hover:text-cocoa hover:shadow-[7px_7px_0_0_#3D2B1F] max-md:w-full max-md:justify-center"
            >
              <span className="px-6 py-3.5 text-[12px] font-extrabold uppercase tracking-[0.16em]">
                Explore the menu
              </span>
              <span className="w-px self-stretch bg-current opacity-40" />
              <span className="flex w-12 items-center justify-center">
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.6} />
              </span>
            </Link>
            <Link to="/visit" className="btn-funk-ghost max-md:w-full">
              Find the bakery
            </Link>
          </div>
        </div>

        <div className="relative mt-12 sm:mt-14">
          <span className="sticker absolute -left-2 -top-5 z-20 -rotate-6 bg-blush sm:left-2 lg:left-6">
            <Spark className="h-2.5 w-2.5" strokeWidth={2.4} />
            Fresh daily
          </span>
          <span className="sticker absolute -right-2 -top-5 z-20 rotate-6 bg-butter sm:right-2 lg:right-6">
            Until sold out
          </span>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-6">
            {PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className={[
                  "hero-photo",
                  photo.wide ? "col-span-2 sm:col-span-1" : "",
                  photo.drop ? "hero-photo-drop" : "",
                ].join(" ")}
              >
                <figure className="relative aspect-[5/4] overflow-hidden rounded-t-[1.75rem] border-2 border-b-0 border-cocoa bg-blush/50 shadow-[5px_5px_0_0_#3D2B1F] sm:aspect-auto sm:h-[330px] lg:h-[400px]">
                  <Image src={photo.src} alt={photo.alt} fittingType="fill" className="h-full w-full" />
                </figure>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-cocoa/50 sm:gap-3">
          <Squiggle className="h-2.5 w-12 sm:w-20" />
          <p className="text-center text-[9px] font-extrabold uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.24em]">
            Two bakers · one deck oven
          </p>
          <Squiggle className="h-2.5 w-12 sm:w-20" />
        </div>
      </div>
    </section>
  );
}