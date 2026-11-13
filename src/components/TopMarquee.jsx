import { SparkFilled } from "@/components/Doodles";

const NOTES = [
  "Baked before sunrise",
  "Small batches only",
  "14 Mews Lane, Bandra West",
  "Closed Mondays",
  "Whole cakes by order",
];

function Run() {
  return (
    <div className="flex shrink-0 items-center gap-6">
      {NOTES.map((note) => (
        <span
          key={note}
          className="flex items-center gap-6 text-[10px] font-extrabold uppercase tracking-[0.22em] text-cream/85"
        >
          <SparkFilled className="h-2.5 w-2.5 text-tang" />
          {note}
        </span>
      ))}
    </div>
  );
}

export default function TopMarquee() {
  return (
    <div className="overflow-hidden border-b-2 border-cocoa bg-cocoa py-2 max-md:py-1.5">
      <div className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap">
        <Run />
        <Run />
      </div>
    </div>
  );
}