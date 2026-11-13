import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Spark, Squiggle } from "@/components/Doodles";

export default function CakesBand() {
  return (
    <section className="relative overflow-hidden border-y-2 border-cocoa bg-blush/60 py-14 max-md:py-10 lg:py-16">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-butter/70 blur-xl" />
      <div className="shell relative flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="eyebrow">
            <Spark className="h-3 w-3 text-bubblegum" strokeWidth={2.2} />
            Custom cakes
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.7rem)] font-black leading-[1.05] tracking-[-0.02em] text-cocoa">
            Planning a table, a birthday,
            <br />
            <span className="italic text-bubblegum">a slow Sunday?</span>
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-cocoa/70">
            Whole cakes and extra loaves are baked to order with a week&apos;s notice. Tell us the
            occasion and we will find a morning for it.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <Link to="/custom-cakes" className="btn-funk">
            Order a custom cake
            <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
          </Link>
          <Squiggle className="h-3 w-24 text-cocoa/30" />
        </div>
      </div>
    </section>
  );
}