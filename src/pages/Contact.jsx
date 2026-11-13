import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Send } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Spark } from "@/components/Doodles";
import { base44 } from "@/api/base44Client";

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [user, setUser] = useState(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    base44.auth
      .me()
      .then((me) => {
        if (!alive || !me) return;
        setUser(me);
        setForm((current) => ({
          ...current,
          name: me.full_name || "",
          email: me.email || "",
        }));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("A name, an email and a note — then we can write back.");
      return;
    }
    setBusy(true);
    try {
      await base44.entities.ContactMessage.create({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setSent(true);
    } catch {
      setError("That did not go through. Try again in a moment, or write to hello@cocoaandcrust.com.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title="Write to"
        accent="the bakery."
        description="Whole cakes, larger orders, a question about an ingredient, or a note about a morning here — it all lands in the same inbox. We read everything between bakes and reply the same week."
      />

      <section className="py-14 max-md:py-10 lg:py-20">
        <div className="shell grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {sent ? (
            <div className="rounded-[1.75rem] border-2 border-cocoa bg-card p-10 text-center shadow-[6px_6px_0_0_#3D2B1F] sm:p-16">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-cocoa bg-blush">
                <Spark className="h-7 w-7 text-cocoa" strokeWidth={2.2} />
              </span>
              <h2 className="mt-5 font-display text-[28px] font-black text-cocoa">
                In the inbox.
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-cocoa/65">
                Thank you — we will write back to {form.email} the same week, usually sooner.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/menu" className="btn-funk">
                  Back to the menu
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({ ...EMPTY, name: user?.full_name || "", email: user?.email || "" });
                  }}
                  className="btn-funk-ghost"
                >
                  Send another
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
                  <label className="label-funk" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    className="field-funk"
                    value={form.name}
                    onChange={update("name")}
                    autoComplete="name"
                    placeholder="Who is writing?"
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
                    placeholder="So we can write back"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="label-funk" htmlFor="subject">
                  Subject (optional)
                </label>
                <input
                  id="subject"
                  className="field-funk"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="A whole cake, a larger order, an ingredient…"
                />
              </div>

              <div className="mt-5">
                <label className="label-funk" htmlFor="message">
                  Your note
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="field-funk resize-none"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us what you need, and when you need it."
                />
              </div>

              {error && (
                <p className="mt-4 rounded-xl border-2 border-bubblegum bg-blush/50 px-4 py-3 text-[13px] font-semibold text-cocoa">
                  {error}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" disabled={busy} className="btn-funk disabled:opacity-60">
                  {busy ? "Sending…" : "Send message"}
                  {!busy && <Send className="h-4 w-4" strokeWidth={2.4} />}
                </button>
                <p className="text-[11px] uppercase tracking-[0.14em] text-cocoa/45">
                  We reply the same week
                </p>
              </div>
            </form>
          )}

          <aside className="space-y-5">
            <div className="rounded-[1.75rem] border-2 border-cocoa bg-blush/55 p-6 shadow-[5px_5px_0_0_#3D2B1F] sm:p-8">
              <p className="eyebrow">
                <Spark className="h-3 w-3 text-tang" strokeWidth={2.2} />
                The bakery
              </p>
              <a
                href="mailto:hello@cocoaandcrust.com"
                className="mt-4 flex items-center gap-2 font-display text-[17px] font-black text-cocoa transition hover:text-bubblegum"
              >
                <Mail className="h-4 w-4 text-bubblegum" />
                hello@cocoaandcrust.com
              </a>
              <p className="mt-4 flex items-start gap-2 text-[13.5px] leading-relaxed text-cocoa/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bubblegum" />
                14 Mews Lane, Bandra West, Mumbai 400050
              </p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-cocoa/70">
                Tue – Fri 7:30 – 18:00 · Sat – Sun 8:00 – 16:00 · Closed Mondays
              </p>
            </div>

            <div className="rounded-[1.75rem] border-2 border-cocoa bg-card p-6 shadow-[5px_5px_0_0_#3D2B1F] sm:p-8">
              <h2 className="font-display text-[22px] font-black text-cocoa">A whole cake?</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-cocoa/65">
                There is a form for that, with a week&apos;s notice and the occasion spelled out.
              </p>
              <Link to="/custom-cakes" className="btn-funk-ghost mt-4">
                Order a custom cake
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}