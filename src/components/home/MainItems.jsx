import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Spark } from "@/components/Doodles";

export default function MainItems({ items }) {
  return (
    <section className="py-14 max-md:py-10 lg:py-20">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">
              <Spark className="h-3 w-3 text-bubblegum" strokeWidth={2.2} />
              Main items
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-black leading-[1.05] tracking-[-0.02em] text-cocoa">
              A short list,{" "}
              <span className="italic text-bubblegum">baked in small batches.</span>
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-cocoa/65">
              The counter carries breads, pastries and cakes — the essentials, done slowly.
              Everything else follows the season.
            </p>
          </div>
          <Link to="/menu" className="btn-funk-ghost shrink-0">
            View the full menu
            <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
          </Link>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item) => (
            <ProductCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}