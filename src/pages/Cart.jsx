import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { formatPrice } from "@/data/menu";
import { useCart } from "@/lib/CartContext";

export default function Cart() {
  const { items, setQuantity, remove, subtotal, count } = useCart();

  return (
    <>
      <PageHero
        eyebrow="Pickup on Mews Lane"
        title="Your bag"
        accent="What you're taking home."
        description="Everything is boxed at the counter. Pick it up on Mews Lane — we will have it wrapped and warm when you arrive."
      />

      <section className="py-14 max-md:py-10 lg:py-20">
        <div className="shell">
          {items.length === 0 ? (
            <div className="rounded-[2rem] border-2 border-cocoa bg-card p-10 text-center shadow-[6px_6px_0_0_#3D2B1F] sm:p-16">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-cocoa bg-blush">
                <ShoppingBag className="h-7 w-7 text-cocoa" strokeWidth={2.4} />
              </span>
              <h2 className="mt-5 font-display text-[26px] font-black text-cocoa">
                Nothing in the bag yet.
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-cocoa/65">
                The counter is warm from half past seven. Start with the breads, or follow your nose
                to the pastry case.
              </p>
              <Link to="/menu" className="btn-funk mt-6">
                Explore the menu
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </Link>
            </div>
          ) : (
            <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
              <div className="rounded-[1.75rem] border-2 border-cocoa bg-card shadow-[6px_6px_0_0_#3D2B1F]">
                <ul className="divide-y-2 divide-cocoa/10">
                  {items.map((line) => (
                    <li key={line.slug} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
                      <Link
                        to={`/menu/${line.slug}`}
                        className="relative h-24 w-full shrink-0 overflow-hidden rounded-[1.1rem] border-2 border-cocoa bg-blush/40 sm:h-20 sm:w-24"
                      >
                        <Image src={line.image} alt={line.name} fittingType="fill" className="h-full w-full" />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/menu/${line.slug}`}
                          className="font-display text-[18px] font-black leading-tight text-cocoa hover:text-bubblegum"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-cocoa/45">
                          {line.category} · {formatPrice(line.price)} each
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 items-center gap-2 rounded-full border-2 border-cocoa bg-cream px-1.5">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.slug, line.quantity - 1)}
                            aria-label={`One fewer ${line.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-butter text-cocoa transition hover:bg-tang"
                          >
                            <Minus className="h-3 w-3" strokeWidth={3} />
                          </button>
                          <span className="min-w-5 text-center font-display text-[14px] font-black text-cocoa">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.slug, line.quantity + 1)}
                            aria-label={`One more ${line.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-butter text-cocoa transition hover:bg-tang"
                          >
                            <Plus className="h-3 w-3" strokeWidth={3} />
                          </button>
                        </div>

                        <span className="w-20 text-right font-display text-[17px] font-black text-cocoa">
                          {formatPrice(line.price * line.quantity)}
                        </span>

                        <button
                          type="button"
                          onClick={() => remove(line.slug)}
                          aria-label={`Remove ${line.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-cocoa/20 text-cocoa/50 transition hover:border-bubblegum hover:text-bubblegum"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={2.2} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="rounded-[1.75rem] border-2 border-cocoa bg-butter/40 p-6 shadow-[6px_6px_0_0_#3D2B1F] sm:p-8">
                <h2 className="font-display text-[24px] font-black text-cocoa">The bag</h2>
                <dl className="mt-4 space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[13.5px] text-cocoa/65">Items</dt>
                    <dd className="font-display text-[16px] font-black text-cocoa">{count}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[13.5px] text-cocoa/65">Pickup</dt>
                    <dd className="text-[12.5px] font-bold text-cocoa">Free · Mews Lane</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-cocoa/15 pt-3">
                    <dt className="text-[13.5px] font-bold text-cocoa">Total</dt>
                    <dd className="font-display text-[24px] font-black text-cocoa">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 text-[11.5px] leading-relaxed text-cocoa/55">
                  Pay at the counter when you collect. No delivery — everything is boxed for pickup.
                </p>
                <Link to="/checkout" className="btn-funk mt-5 w-full">
                  Continue to pickup
                  <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                </Link>
                <Link
                  to="/menu"
                  className="mt-3 block text-center text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-cocoa/55 transition hover:text-bubblegum"
                >
                  Add something else
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}