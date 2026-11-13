import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowRight, Lock, ShoppingBag } from "lucide-react";
import PageHero from "@/components/PageHero";
import { PICKUP_SLOTS, formatPrice } from "@/data/menu";
import { earliestPickupDate, makeReference } from "@/lib/orders";
import { useCart } from "@/lib/CartContext";
import { base44 } from "@/api/base44Client";

export default function Checkout() {
  const { items, subtotal, count, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    phone: "",
    pickup_date: "",
    pickup_slot: PICKUP_SLOTS[0],
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [failure, setFailure] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setForm((current) => ({ ...current, pickup_date: current.pickup_date || earliestPickupDate() }));
    base44.auth
      .me()
      .then((me) => {
        if (!me) return;
        setForm((current) => ({
          ...current,
          customer_name: current.customer_name || me.full_name || "",
          email: current.email || me.email || "",
          phone: current.phone || me.phone || "",
        }));
      })
      .catch(() => {});
  }, []);

  const update = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const validate = () => {
    const next = {};
    if (!form.customer_name.trim()) next.customer_name = "Tell us who is collecting.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "A working email, please.";
    if (form.phone.replace(/\D/g, "").length < 6) next.phone = "A number the counter can reach.";
    if (!form.pickup_date) next.pickup_date = "Choose a morning.";
    if (!form.pickup_slot) next.pickup_slot = "Choose a slot.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    setFailure("");
    if (!validate()) return;
    setBusy(true);
    try {
      const reference = makeReference();
      const order = await base44.entities.Order.create({
        reference,
        customer_name: form.customer_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        pickup_date: form.pickup_date,
        pickup_slot: form.pickup_slot,
        notes: form.notes.trim(),
        items: items.map((line) => ({
          slug: line.slug,
          name: line.name,
          image: line.image,
          price: line.price,
          quantity: line.quantity,
        })),
        item_count: count,
        total: subtotal,
        status: "pending",
      });
      clear();
      navigate(`/order/${order.reference}`, { state: { order } });
    } catch {
      setFailure("We could not place that order. Try again.");
    } finally {
      setBusy(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <PageHero eyebrow="Pickup details" title="Nothing to" accent="pick up yet." />
        <section className="py-16">
          <div className="shell">
            <div className="mx-auto max-w-xl rounded-[2rem] border-2 border-cocoa bg-card p-10 text-center shadow-[6px_6px_0_0_#3D2B1F]">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-cocoa bg-blush">
                <ShoppingBag className="h-7 w-7 text-cocoa" strokeWidth={2.4} />
              </span>
              <h2 className="mt-5 font-display text-[24px] font-black text-cocoa">
                The bag is empty.
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-cocoa/65">
                Pick something from the counter first, then we will find a morning for it.
              </p>
              <Link to="/menu" className="btn-funk mt-6">
                Explore the menu
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Pickup only · pay at the counter"
        title="Pickup"
        accent="details."
        description="Tell us who is collecting and when. Everything is boxed and waiting on Mews Lane — nothing is delivered."
      />

      <section className="py-14 max-md:py-10 lg:py-20">
        <form onSubmit={submit} className="shell grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          <div className="space-y-5">
            <div className="rounded-[1.75rem] border-2 border-cocoa bg-card p-6 shadow-[6px_6px_0_0_#3D2B1F] sm:p-8">
              <h2 className="font-display text-[22px] font-black text-cocoa">Who is collecting</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-funk" htmlFor="customer_name">
                    Name
                  </label>
                  <input
                    id="customer_name"
                    className="field-funk"
                    value={form.customer_name}
                    onChange={update("customer_name")}
                    autoComplete="name"
                    aria-invalid={!!errors.customer_name}
                  />
                  {errors.customer_name && (
                    <p className="mt-1.5 text-[11.5px] font-semibold text-bubblegum">{errors.customer_name}</p>
                  )}
                </div>
                <div>
                  <label className="label-funk" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="field-funk"
                    value={form.email}
                    onChange={update("email")}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-[11.5px] font-semibold text-bubblegum">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="label-funk" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    className="field-funk"
                    value={form.phone}
                    onChange={update("phone")}
                    autoComplete="tel"
                    placeholder="+91"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-[11.5px] font-semibold text-bubblegum">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border-2 border-cocoa bg-card p-6 shadow-[6px_6px_0_0_#3D2B1F] sm:p-8">
              <h2 className="font-display text-[22px] font-black text-cocoa">When</h2>
              <p className="mt-1 text-[13px] text-cocoa/60">
                Breads from 7:30am, pastries through the morning. Closed Mondays.
              </p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-funk" htmlFor="pickup_date">
                    Pickup date
                  </label>
                  <input
                    id="pickup_date"
                    type="date"
                    className="field-funk"
                    min={earliestPickupDate()}
                    value={form.pickup_date}
                    onChange={update("pickup_date")}
                    aria-invalid={!!errors.pickup_date}
                  />
                  {errors.pickup_date && (
                    <p className="mt-1.5 text-[11.5px] font-semibold text-bubblegum">{errors.pickup_date}</p>
                  )}
                </div>
                <div>
                  <label className="label-funk" htmlFor="pickup_slot">
                    Slot
                  </label>
                  <select
                    id="pickup_slot"
                    className="field-funk"
                    value={form.pickup_slot}
                    onChange={update("pickup_slot")}
                  >
                    {PICKUP_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label className="label-funk" htmlFor="notes">
                  Anything for the counter? (optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className="field-funk resize-none"
                  value={form.notes}
                  onChange={update("notes")}
                  placeholder="Sliced, wrapped as a gift, an allergy to keep an eye on…"
                />
              </div>
            </div>

            {failure && (
              <p className="rounded-xl border-2 border-bubblegum bg-blush/50 px-4 py-3 text-[13px] font-semibold text-cocoa">
                {failure}
              </p>
            )}
          </div>

          <aside className="rounded-[1.75rem] border-2 border-cocoa bg-butter/40 p-6 shadow-[6px_6px_0_0_#3D2B1F] sm:p-8">
            <h2 className="font-display text-[22px] font-black text-cocoa">
              {count} item{count === 1 ? "" : "s"}
            </h2>
            <ul className="mt-4 space-y-3">
              {items.map((line) => (
                <li key={line.slug} className="flex items-center gap-3">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[0.7rem] border-2 border-cocoa bg-cream">
                    <Image src={line.image} alt={line.name} fittingType="fill" className="h-full w-full" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[14px] font-black text-cocoa">
                      {line.name}
                    </span>
                    <span className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-cocoa/45">
                      × {line.quantity}
                    </span>
                  </span>
                  <span className="font-display text-[14px] font-black text-cocoa">
                    {formatPrice(line.price * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-baseline justify-between border-t-2 border-cocoa/15 pt-4">
              <span className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-cocoa/55">
                Total
              </span>
              <span className="font-display text-[26px] font-black text-cocoa">{formatPrice(subtotal)}</span>
            </div>

            <button type="submit" disabled={busy} className="btn-funk mt-5 w-full disabled:opacity-60">
              {busy ? "Placing…" : "Place pickup order"}
              {!busy && <ArrowRight className="h-4 w-4" strokeWidth={2.6} />}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] uppercase tracking-[0.14em] text-cocoa/50">
              <Lock className="h-3 w-3" />
              No payment now — pay at the counter
            </p>
            <Link
              to="/cart"
              className="mt-2 block text-center text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-cocoa/50 transition hover:text-bubblegum"
            >
              Back to the bag
            </Link>
          </aside>
        </form>
      </section>
    </>
  );
}