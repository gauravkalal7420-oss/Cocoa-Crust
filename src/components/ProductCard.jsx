import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { Plus } from "lucide-react";
import { formatPrice } from "@/data/menu";
import { useCart } from "@/lib/CartContext";

export default function ProductCard({ item }) {
  const { add } = useCart();

  return (
    <article className="flex flex-col overflow-hidden rounded-[1.75rem] border-2 border-cocoa bg-card shadow-[5px_5px_0_0_#3D2B1F] transition-transform duration-300 hover:-translate-y-1">
      <Link to={`/menu/${item.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-cocoa bg-blush/40">
          <Image
            src={item.image}
            alt={item.name}
            fittingType="fill"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <span className="sticker absolute left-3 top-3 bg-cream">{item.category}</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[21px] font-black leading-tight text-cocoa">
            <Link to={`/menu/${item.slug}`}>{item.name}</Link>
          </h3>
          <span className="whitespace-nowrap font-display text-[19px] font-black text-cocoa">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-cocoa/65">{item.description}</p>
        <button
          type="button"
          onClick={() => add(item, 1)}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border-2 border-cocoa bg-butter px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-cocoa shadow-[3px_3px_0_0_#3D2B1F] transition hover:-translate-y-0.5 hover:bg-tang hover:shadow-[5px_5px_0_0_#3D2B1F]"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={3} />
          Add to bag
        </button>
      </div>
    </article>
  );
}