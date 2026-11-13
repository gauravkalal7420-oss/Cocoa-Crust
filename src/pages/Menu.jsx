import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { Spark, Squiggle } from "@/components/Doodles";
import { CATEGORIES } from "@/data/menu";
import useMenuItems from "@/hooks/useMenuItems";
import { cn } from "@/lib/utils";

export default function Menu() {
  const { items, loading } = useMenuItems();
  const [active, setActive] = useState("Everything");

  const tabs = useMemo(
    () => ["Everything", ...CATEGORIES.map((category) => category.name)],
    []
  );

  const groups = useMemo(() => {
    const visible = active === "Everything" ? items : items.filter((item) => item.category === active);
    return CATEGORIES.map((category) => ({
      ...category,
      items: visible.filter((item) => item.category === category.name),
    })).filter((group) => group.items.length > 0);
  }, [items, active]);

  return (
    <>
      <PageHero
        eyebrow="Baked fresh daily · until sold out"
        title="The main items,"
        accent="baked in small batches."
        description="A short list, kept short on purpose. Breads come out of the oven from half past seven, pastries through the morning, cakes in the afternoon."
      >
        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={cn(
                "rounded-full border-2 border-cocoa px-4 py-2 text-[10.5px] font-extrabold uppercase tracking-[0.14em] transition",
                active === tab
                  ? "bg-bubblegum text-cream shadow-[3px_3px_0_0_#3D2B1F]"
                  : "bg-card text-cocoa/70 hover:bg-butter"
              )}
            >
              {tab}
            </button>
          ))}
          <span className="ml-auto flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-cocoa/50">
            <Spark className="h-3 w-3 text-tang" strokeWidth={2.2} />
            {items.length} items on the counter
          </span>
        </div>
      </PageHero>

      <section className="py-12 max-md:py-9 lg:py-16">
        <div className="shell space-y-12">
          {loading && (
            <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-cocoa/40">
              Warming the counter…
            </p>
          )}

          {groups.map((group) => (
            <div key={group.name}>
              <div className="flex items-end justify-between gap-4 border-b-2 border-cocoa/15 pb-3">
                <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-black text-cocoa">
                  {group.name}
                </h2>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-cocoa/45">
                  {group.blurb}
                </p>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {group.items.map((item) => (
                  <ProductCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-cocoa bg-blush/50 py-12 max-md:py-10 lg:py-16">
        <div className="shell flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Whole cakes &amp; loaves</p>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-black leading-[1.05] text-cocoa">
              Planning a table, a birthday,
              <br />
              <span className="italic text-bubblegum">a slow Sunday?</span>
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-cocoa/70">
              Whole cakes and extra loaves are baked to order with a week&apos;s notice. Write to us
              and we will find a morning for it.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/custom-cakes" className="btn-funk">
              Order a custom cake
              <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
            </Link>
            <Squiggle className="h-3 w-24 self-center text-cocoa/30" />
          </div>
        </div>
      </section>
    </>
  );
}