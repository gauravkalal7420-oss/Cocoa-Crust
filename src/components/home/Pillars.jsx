const PILLARS = [
  {
    number: "01",
    title: "Bread",
    body: "Long-fermented loaves with a dark, blistered crust and an open, custardy crumb.",
    bubble: "bg-blush",
  },
  {
    number: "02",
    title: "Pastry",
    body: "Hand-laminated with cultured butter, folded and rested across three days.",
    bubble: "bg-butter",
  },
  {
    number: "03",
    title: "Cacao",
    body: "Single-origin chocolate, ground in house for cakes, ganache and cups.",
    bubble: "bg-tang/40",
  },
];

export default function Pillars() {
  return (
    <section className="border-y-2 border-cocoa bg-blush/35 py-14 max-md:py-10 lg:py-20">
      <div className="shell grid gap-5 max-md:gap-4 sm:grid-cols-3 sm:gap-6">
        {PILLARS.map((pillar) => (
          <article
            key={pillar.number}
            className="rounded-[1.75rem] border-2 border-cocoa bg-card p-6 shadow-[5px_5px_0_0_#3D2B1F] transition-transform duration-300 hover:-rotate-1 max-md:p-5 max-md:shadow-[4px_4px_0_0_#3D2B1F] sm:p-7"
          >
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-cocoa font-display text-[13px] font-black text-cocoa ${pillar.bubble}`}
            >
              {pillar.number}
            </span>
            <h2 className="mt-5 font-display text-[26px] font-black text-cocoa max-md:mt-4 max-md:text-[23px]">
              {pillar.title}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-cocoa/65">{pillar.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}