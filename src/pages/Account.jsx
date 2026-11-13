import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LogOut, Mail, UserRound } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Spark } from "@/components/Doodles";
import { base44 } from "@/api/base44Client";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ full_name: "", phone: "", address: "" });
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    base44.auth
      .me()
      .then((me) => {
        if (!alive || !me) return;
        setUser(me);
        setForm({
          full_name: me.full_name || "",
          phone: me.phone || "",
          address: me.address || "",
        });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const save = async (event) => {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    setError("");
    try {
      await base44.auth.updateMe({
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      });
      setNotice("Saved — the counter will know it's you.");
    } catch {
      setError("That did not save. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    await base44.auth.logout("/");
    navigate("/");
  };

  return (
    <>
      <PageHero
        eyebrow="Your account"
        title="Keep your details"
        accent="close at hand."
        description="Saved here so pickup orders are one step shorter. We only use them to hand you the right box."
      />

      <section className="py-14 max-md:py-10 lg:py-20">
        <div className="shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
          <form
            onSubmit={save}
            className="rounded-[1.75rem] border-2 border-cocoa bg-card p-6 shadow-[6px_6px_0_0_#3D2B1F] sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label className="label-funk" htmlFor="full_name">
                  Name
                </label>
                <input
                  id="full_name"
                  className="field-funk"
                  value={form.full_name}
                  onChange={update("full_name")}
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="label-funk" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className="field-funk opacity-60"
                  value={user?.email || ""}
                  readOnly
                />
                <p className="mt-1.5 text-[11px] text-cocoa/45">
                  This is the one you signed in with.
                </p>
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
                />
              </div>

              <div>
                <label className="label-funk" htmlFor="address">
                  Address (optional)
                </label>
                <textarea
                  id="address"
                  rows={3}
                  className="field-funk resize-none"
                  value={form.address}
                  onChange={update("address")}
                  placeholder="Only if it helps us find you at the counter."
                />
              </div>
            </div>

            {notice && (
              <p className="mt-5 rounded-xl border-2 border-[#8CCFA0] bg-[#EAF8EE] px-4 py-3 text-[13px] font-semibold text-cocoa">
                {notice}
              </p>
            )}
            {error && (
              <p className="mt-5 rounded-xl border-2 border-bubblegum bg-blush/50 px-4 py-3 text-[13px] font-semibold text-cocoa">
                {error}
              </p>
            )}

            <button type="submit" disabled={busy} className="btn-funk mt-6 disabled:opacity-60">
              {busy ? "Saving…" : "Save details"}
            </button>
          </form>

          <aside className="space-y-5">
            <div className="rounded-[1.75rem] border-2 border-cocoa bg-blush/55 p-6 shadow-[5px_5px_0_0_#3D2B1F] sm:p-8">
              <p className="eyebrow">
                <Spark className="h-3 w-3 text-tang" strokeWidth={2.2} />
                At the bakery
              </p>
              <p className="mt-4 flex items-center gap-2 text-[14px] text-cocoa/75">
                <UserRound className="h-4 w-4 text-bubblegum" />
                {user?.full_name || "Signed in"}
              </p>
              <p className="mt-2 flex items-center gap-2 text-[14px] text-cocoa/75">
                <Mail className="h-4 w-4 text-bubblegum" />
                {user?.email || "—"}
              </p>
              <Link to="/orders" className="btn-funk-ghost mt-5 w-full">
                Order history
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </Link>
              <Link to="/menu" className="btn-funk-ghost mt-3 w-full">
                Explore the menu
              </Link>
            </div>

            <button
              type="button"
              onClick={signOut}
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-cocoa/25 px-5 py-3 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-cocoa/60 transition hover:border-cocoa hover:text-cocoa"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={2.6} />
              Sign out
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}