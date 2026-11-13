import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ImagePlus } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Spark } from "@/components/Doodles";
import { base44 } from "@/api/base44Client";

const OCCASIONS = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Baby shower",
  "Office table",
  "Just because",
];

const FLAVOURS = [
  "Dark cocoa & salted ganache",
  "Vanilla bean & raspberry",
  "Brown butter hazelnut",
  "Lemon & thyme",
  "Something else — I'll describe it",
];

const EMPTY = {
  customer_name: "",
  email: "",
  phone: "",
  occasion: "Birthday",
  people: "",
  flavour: FLAVOURS[0],
  look: "",
  needed_by: "",
  budget: "",
  notes: "",
};

const STEPS = [
  { number: "1.", text: "You send the shape of the idea." },
  { number: "2.", text: "We reply within two days with a price and a pickup morning." },
  { number: "3.", text: "Half on confirmation, the rest at the counter." },
];

export default function CustomCakes() {
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const fileInput = useRef(null);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.customer_name.trim() || !form.email.trim()) {
      setError("A name and an email, so we can write back with a plan.");
      return;
    }
    setBusy(true);
    try {
      let inspirationFile = "";
      if (file) {
        const uploaded = await base44.integrations.Core.UploadPrivateFile({ file });
        inspirationFile = uploaded.file_uri;
      }
      await base44.entities.CakeRequest.create({
        customer_name: form.customer_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        occasion: form.occasion,
        people: form.people.trim(),
        flavour: form.flavour,
        look: form.look.trim(),
        needed_by: form.needed_by,
        budget: form.budget.trim(),
        notes: form.notes.trim(),
        inspiration_file: inspirationFile,
        status: "pending",
      });
      setSent(true);
    } catch {
      setError("That did not send. Try again in a moment, or write to hello@cocoaandcrust.com.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Baked to order · a week's notice"
        title="A cake for"
        accent="the occasion."
        description="Whole cakes, celebration cakes and extra loaves. Tell us who it is for, how many at the table and what it should look like — we will write back with a plan and a price."
      />

      <section className="py-14 max-md:py-10 lg:py-20">
        <div className="shell grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {sent ? (
            <div className="rounded-[1.75rem] border-2 border-cocoa bg-card p-10 text-center shadow-[6px_6px_0_0_#3D2B1F] sm:p-16">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-cocoa bg-blush">
                <Spark className="h-7 w-7 text-cocoa" strokeWidth={2.2} />
              </span>
              <h2 className="mt-5 font-display text-[28px] font-black text-cocoa">
                The request is in.
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-cocoa/65">
                Thank you — we will reply within two days with a price and a pickup morning. This is
                a request, not a booking, until we confirm by email.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/menu" className="btn-funk">
                  Back to the menu
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm(EMPTY);
                    setFile(null);
                  }}
                  className="btn-funk-ghost"
                >
                  Another cake
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="rounded-[1.75rem] border-2 border-cocoa bg-card p-6 shadow-[6px_6px_0_0_#3D2B1F] sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-funk" htmlFor="occasion">
                    Occasion
                  </label>
                  <select
                    id="occasion"
                    className="field-funk"
                    value={form.occasion}
                    onChange={update("occasion")}
                  >
                    {OCCASIONS.map((occasion) => (
                      <option key={occasion} value={occasion}>
                        {occasion}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-funk" htmlFor="people">
                    How many people?
                  </label>
                  <input
                    id="people"
                    className="field-funk"
                    value={form.people}
                    onChange={update("people")}
                    placeholder="Eight, twenty, forty…"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="label-funk" htmlFor="flavour">
                  Flavour
                </label>
                <select
                  id="flavour"
                  className="field-funk"
                  value={form.flavour}
                  onChange={update("flavour")}
                >
                  {FLAVOURS.map((flavour) => (
                    <option key={flavour} value={flavour}>
                      {flavour}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label className="label-funk" htmlFor="look">
                  How should it look?
                </label>
                <textarea
                  id="look"
                  rows={3}
                  className="field-funk resize-none"
                  value={form.look}
                  onChange={update("look")}
                  placeholder="Colours, a message on top, the shape of the idea…"
                />
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-funk" htmlFor="needed_by">
                    Needed by
                  </label>
                  <input
                    id="needed_by"
                    type="date"
                    className="field-funk"
                    value={form.needed_by}
                    onChange={update("needed_by")}
                  />
                  <p className="mt-1.5 text-[11px] text-cocoa/45">A week&apos;s notice, at least.</p>
                </div>
                <div>
                  <label className="label-funk" htmlFor="budget">
                    Budget (optional)
                  </label>
                  <input
                    id="budget"
                    className="field-funk"
                    value={form.budget}
                    onChange={update("budget")}
                    placeholder="₹"
                  />
                </div>
              </div>

              <div className="mt-6 border-t-2 border-cocoa/10 pt-6">
                <h2 className="font-display text-[20px] font-black text-cocoa">
                  You, and anything else
                </h2>
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
                    />
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
                    />
                  </div>
                  <div>
                    <label className="label-funk" htmlFor="phone">
                      Phone (optional)
                    </label>
                    <input
                      id="phone"
                      className="field-funk"
                      value={form.phone}
                      onChange={update("phone")}
                      autoComplete="tel"
                      placeholder="+91"
                    />
                  </div>
                  <div>
                    <span className="label-funk">Inspiration photo (optional)</span>
                    <input
                      ref={fileInput}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => setFile(event.target.files?.[0] || null)}
                    />
                    <button
                      type="button"
                      onClick={() => fileInput.current?.click()}
                      className="flex w-full items-center gap-2 rounded-[0.9rem] border-2 border-dashed border-cocoa/40 bg-cream px-4 py-3 text-left text-[13px] text-cocoa/60 transition hover:border-cocoa hover:bg-butter/40"
                    >
                      <ImagePlus className="h-4 w-4 text-bubblegum" />
                      {file ? file.name : "Attach a photo"}
                    </button>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="label-funk" htmlFor="notes">
                    Anything else? (optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="field-funk resize-none"
                    value={form.notes}
                    onChange={update("notes")}
                    placeholder="Allergies, a message on top, pickup constraints…"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 rounded-xl border-2 border-bubblegum bg-blush/50 px-4 py-3 text-[13px] font-semibold text-cocoa">
                  {error}
                </p>
              )}

              <div className="mt-6">
                <button type="submit" disabled={busy} className="btn-funk w-full disabled:opacity-60 sm:w-auto">
                  {busy ? "Sending…" : "Send cake request"}
                  {!busy && <ArrowRight className="h-4 w-4" strokeWidth={2.6} />}
                </button>
                <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-cocoa/45">
                  A request, not a booking — we confirm every cake by email.
                </p>
              </div>
            </form>
          )}

          <aside className="space-y-5">
            <div className="rounded-[1.75rem] border-2 border-cocoa bg-blush/55 p-6 shadow-[5px_5px_0_0_#3D2B1F] sm:p-8">
              <p className="eyebrow">
                <Spark className="h-3 w-3 text-tang" strokeWidth={2.2} />
                Baked to order
              </p>
              <h2 className="mt-4 font-display text-[26px] font-black text-cocoa">How it works</h2>
              <ol className="mt-4 space-y-4">
                {STEPS.map((step) => (
                  <li key={step.number} className="flex gap-3">
                    <span className="font-display text-[15px] font-black text-bubblegum">
                      {step.number}
                    </span>
                    <p className="text-[13.5px] leading-relaxed text-cocoa/70">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[1.75rem] border-2 border-cocoa bg-card p-6 shadow-[5px_5px_0_0_#3D2B1F] sm:p-8">
              <h2 className="font-display text-[20px] font-black text-cocoa">Prefer to talk?</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-cocoa/65">
                Write to hello@cocoaandcrust.com or come by the counter on Mews Lane, Tuesday to
                Sunday.
              </p>
              <Link to="/contact" className="btn-funk-ghost mt-4">
                Write to the bakery
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}