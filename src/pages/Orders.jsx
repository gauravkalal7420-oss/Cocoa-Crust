import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowRight, Loader2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { formatPrice } from "@/data/menu";
import { ORDER_STATUS, formatPickupDate } from "@/lib/orders";
import { base44 } from "@/api/base44Client";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    base44.entities.Order.list({ sort: "-created_date", limit: 50 })
      .then((result) => {
        const rows = Array.isArray(result) ? result : result?.items || [];
        if (alive) setOrders(rows);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Order history"
        title="Everything you've"
        accent="taken home."
        description="Pickup orders placed while signed in. Whole cake requests are confirmed by email instead."
      />

      <section className="py-12 max-md:py-9 lg:py-16">
        <div className="shell max-w-4xl">
          {loading && (
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-cocoa/40">
              <Loader2 className="h-4 w-4 animate-spin" />
              Fetching the order book…
            </div>
          )}

          {!loading && orders.length === 0 && (
            <div className="rounded-[2rem] border-2 border-cocoa bg-card p-10 text-center shadow-[6px_6px_0_0_#3D2B1F] sm:p-14">
              <h2 className="font-display text-[24px] font-black text-cocoa">No orders yet.</h2>
              <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-cocoa/65">
                Once you place a pickup order while signed in, it will show up here with its
                reference and pickup morning.
              </p>
              <Link to="/menu" className="btn-funk mt-6">
                Explore the menu
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </Link>
            </div>
          )}

          <div className="space-y-5">
            {orders.map((order) => {
              const status = ORDER_STATUS[order.status] || ORDER_STATUS.pending;
              return (
                <article
                  key={order.id}
                  className="rounded-[1.5rem] border-2 border-cocoa bg-card p-5 shadow-[5px_5px_0_0_#3D2B1F] sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-[17px] font-black tracking-wide text-cocoa">
                        {order.reference}
                      </p>
                      <p className="mt-1 text-[12.5px] text-cocoa/60">
                        {formatPickupDate(order.pickup_date)} · {order.pickup_slot}
                      </p>
                    </div>
                    <span className={`rounded-full border-2 border-cocoa px-3 py-1 text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-cocoa ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2.5 border-t-2 border-cocoa/10 pt-4">
                    {(order.items || []).map((line) => (
                      <li key={line.slug} className="flex items-center gap-3">
                        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[0.6rem] border-2 border-cocoa bg-cream">
                          <Image src={line.image} alt={line.name} fittingType="fill" className="h-full w-full" />
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[13.5px] text-cocoa/75">
                          {line.name}
                          <span className="ml-1 text-cocoa/40">× {line.quantity}</span>
                        </span>
                        <span className="text-[13.5px] font-bold text-cocoa">
                          {formatPrice(line.price * line.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-cocoa/10 pt-4">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-cocoa/50">
                      {order.item_count || 0} items · {formatPrice(order.total)}
                    </p>
                    <Link
                      to={`/order/${order.reference}`}
                      className="inline-flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-bubblegum"
                    >
                      View the order
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.8} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}