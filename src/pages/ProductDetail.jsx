import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Image } from "@/components/ui/image";
import ProductCard from "@/components/ProductCard";
import { Spark } from "@/components/Doodles";
import { formatPrice } from "@/data/menu";
import useMenuItems from "@/hooks/useMenuItems";
import { useCart } from "@/lib/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const { items, loading } = useMenuItems();
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => items.find((item) => item.slug === slug), [items, slug]);
  const alsoOn = useMemo(
    () => items.filter((item) => item.category === product?.category && item.slug !== slug).slice(0, 3),
    [items, product, slug]
  );

  if (!product) {
    return (
      <section className="py-20">
        <div className="shell text-center">
          <p className="eyebrow">Off the counter</p>
          <h1 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-black text-cocoa">
            {loading ? "Warming the counter…" : "That one is sold out."}
          </h1>
          {!loading && (
            <>
              <p className="mt-3 text-[15px] text-cocoa/65">
                This item is not on today&apos;s list. The rest of the counter is still warm.
              </p>
              <Link to="/menu" className="btn-funk mt-6">
                Back to the menu
              </Link>
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pb-14 pt-8 max-md:pb-10 max-md:pt-6 lg:pb-20">
        <div className="shell">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-cocoa/55 transition hover:text-bubblegum"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={3} />
            Back to the menu
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative">
              <span className="sticker absolute left-4 top-4 z-10 -rotate-3 bg-butter">
                <Spark className="h-2.5 w-2.5" strokeWidth={2.4} />
                Baked today
              </span>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border-2 border-cocoa bg-blush/40 shadow-[6px_6px_0_0_#3D2B1F]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fittingType="fill"
                  className="h-full w-full"
                />
              </figure>
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-cocoa/45">
                {product.category}
              </p>
              <h1 className="mt-2 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-black leading-[1.02] tracking-[-0.02em] text-cocoa">
                {product.name}
              </h1>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display text-[28px] font-black text-cocoa">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cocoa/45">
                  per item · pickup only
                </span>
              </div>

              <p className="mt-4 text-[15px] leading-[1.75] text-cocoa/70">{product.description}</p>
              {product.story && (
                <p className="mt-3 text-[15px] leading-[1.75] text-cocoa/70">{product.story}</p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex h-12 items-center gap-2 rounded-full border-2 border-cocoa bg-card px-2 shadow-[3px_3px_0_0_#3D2B1F]">
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    aria-label="One fewer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-butter text-cocoa transition hover:bg-tang"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={3} />
                  </button>
                  <span className="min-w-6 text-center font-display text-[16px] font-black text-cocoa">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    aria-label="One more"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-butter text-cocoa transition hover:bg-tang"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => add(product, quantity)}
                  className="btn-funk h-12"
                >
                  Add to bag
                </button>
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-cocoa/60 transition hover:text-bubblegum"
                >
                  View bag
                </Link>
              </div>

              <div className="mt-7 space-y-3 rounded-[1.5rem] border-2 border-cocoa bg-butter/40 p-5">
                {product.ingredients && (
                  <div>
                    <p className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-cocoa/50">
                      Ingredients
                    </p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-cocoa/75">
                      {product.ingredients}
                    </p>
                  </div>
                )}
                {product.allergens && (
                  <div className="border-t border-cocoa/15 pt-3">
                    <p className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-cocoa/50">
                      Allergens
                    </p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-cocoa/75">
                      {product.allergens}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {alsoOn.length > 0 && (
        <section className="border-t-2 border-cocoa bg-blush/30 py-12 max-md:py-10 lg:py-16">
          <div className="shell">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-black text-cocoa">
                Also on the counter
              </h2>
              <Link
                to="/menu"
                className="text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-cocoa/55 transition hover:text-bubblegum"
              >
                Whole menu
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {alsoOn.map((item) => (
                <ProductCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}