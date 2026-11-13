import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { formatPrice } from "@/data/menu";
import { ORDER_STATUS, formatPickupDate } from "@/lib/orders";
import { base44 } from "@/api/base44Client";

export default function OrderDetail() {
  const { reference } = useParams();
  const location = useLocation();
  const seeded = location.state?.order;
  const [order, setOrder] = useState(seeded || null);
  const [loading, setLoading] = useState(!seeded);

  useEffect(() => {
    if (seeded) return;
    let alive = true;
    base44.entities.Order.filter({ reference }, { limit: 1 })
      .then((result) => {
        const rows = Array.isArray(result) ? result : result?.items || [];
        if (alive) setOrder(rows[0] || null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [reference, seeded]);

  useEffect(() => {
    if (loading || order) return;
    const meta = document.createElement("meta");
    meta.name = "prerender-status-code";
    meta.content = "404";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, [loading, order]);

  if (loading) {
    return (
      <section className="py-24">
        <div className="shell text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-cocoa/40">
            Finding that order…
          </p>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="py-20">
        <div className="shell max-w-xl text-center">
          <p className="eyebrow">Not on the list</p>
          <h1 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-black text-cocoa">
            We cannot find that order.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-cocoa/65">
            Check the reference on your confirmation email, or write to hello@cocoaandcrust.com and we
            will look it up at the counter.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/menu" className="btn-funk">
              Back to the menu
            </Link>
            <Link to="/contact" className="btn-funk-ghost">
              Write to us
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const status = ORDER_STATUS[order.status] || ORDER_STATUS.pending;
  const firstName = (order.customer_name || "").split(" ")[0];

  return (
    <section className="pb-14 pt-10 max-md:pb-10 max-md:pt-8 lg:pb-20 lg:pt-14">
      <div className="shell max-w-4xl">
        <div className="relative rounded-[2rem] border-2 border-cocoa bg-card p-6 text-center shadow-[6px_6px_0_0_#3D2B1F] sm:p-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-cocoa bg-[#CDEFD8]">
            <Check className="h-8 w-8 text-cocoa" strokeWidth={3} />
          </span>
          <h1 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,2.9rem)] font-black leading-[1.02] text-cocoa">
            It&apos;s on the list, <span className="italic text-bubblegum">{firstName || "friend"}.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-cocoa/65">
            We have your order and will have it boxed and warm. Pay at the counter when you collect.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border-2 border-cocoa bg-butter/50 px-5 py-3">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cocoa/50">
              Reference
            </span>
            <span className="font-display text-[19px] font-black tracking-wide text-cocoa">
              {order.reference}
            </span>
            <span className={`rounded-full border-2 border-cocoa px-3 py-1 text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-cocoa ${status.className}`}>
              {status.label}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border-2 border-cocoa bg-blush/45 p-6 shadow-[5px_5px_0_0_#3D2B1F]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cocoa/50">Picking up</p>
            <p className="mt-2 font-display text-[19px] font-black text-cocoa">
              {formatPickupDate(order.pickup_date)}
            </p>
            <p className="text-[13.5px] text-cocoa/65">{order.pickup_slot}</p>
            <p className="mt-3 flex items-start gap-2 text-[13px] leading-relaxed text-cocoa/65">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bubblegum" />
              14 Mews Lane, Bandra West, Mumbai 400050
            </p>
          </div>

          <div className="rounded-[1.5rem] border-2 border-cocoa bg-card p-6 shadow-[5px_5px_0_0_#3D2B1F]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cocoa/50">Collecting</p>
            <p className="mt-2 font-display text-[19px] font-black text-cocoa">{order.customer_name}</p>
            <p className="text-[13.5px] text-cocoa/65">{order.email}</p>
            <p className="text-[13.5px] text-cocoa/65">{order.phone}</p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border-2 border-cocoa bg-card p-6 shadow-[5px_5px_0_0_#3D2B1F] sm:p-7">
          <h2 className="font-display text-[20px] font-black text-cocoa">What&apos;s in the box</h2>
          <ul className="mt-4 divide-y-2 divide-cocoa/10">
            {(order.items || []).map((line) => (
              <li key={line.slug} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[0.7rem] border-2 border-cocoa bg-cream">
                  <Image src={line.image} alt={line.name} fittingType="fill" className="h-full w-full" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] font-black text-cocoa">{line.name}</span>
                  <span className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-cocoa/45">
                    × {line.quantity}
                  </span>
                </span>
                <span className="font-display text-[15px] font-black text-cocoa">
                  {formatPrice(line.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t-2 border-cocoa/15 pt-4">
            <span className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-cocoa/55">
              Total, at the counter
            </span>
            <span className="font-display text-[24px] font-black text-cocoa">{formatPrice(order.total)}</span>
          </div>
          {order.notes && (
            <div className="mt-4 rounded-xl border-2 border-dashed border-cocoa/25 px-4 py-3">
              <p className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-cocoa/45">Your note</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-cocoa/70">{order.notes}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/menu" className="btn-funk">
            Back to the menu
            <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
          </Link>
          <Link to="/orders" className="btn-funk-ghost">
            Order history
          </Link>
          <Link
            to="/contact"
            className="text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-cocoa/55 transition hover:text-bubblegum"
          >
            Something to change?
          </Link>
        </div>
      </div>
    </section>
  );
}