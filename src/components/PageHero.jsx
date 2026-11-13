import { Spark } from "@/components/Doodles";

export default function PageHero({ eyebrow, title, accent, description, children }) {
  return (
    <section className="relative overflow-hidden border-b-2 border-cocoa bg-background pb-10 pt-10 max-md:pb-8 max-md:pt-8 sm:pb-14 sm:pt-14">
      <div className="pointer-events-none absolute -left-20 top-6 h-56 w-56 rounded-full bg-blush/60 blur-2xl" />
      <div className="pointer-events-none absolute -right-14 top-24 h-48 w-48 rounded-full bg-butter/60 blur-2xl" />
      <div className="shell relative">
        {eyebrow && (
          <p className="eyebrow">
            <Spark className="h-3 w-3 text-tang" strokeWidth={2.2} />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.1rem,5.2vw,3.6rem)] font-black leading-[1.0] tracking-[-0.03em] text-cocoa">
          {title}{" "}
          {accent && <span className="italic text-bubblegum">{accent}</span>}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-cocoa/70 sm:text-[16px]">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}