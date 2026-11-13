import { Link } from "react-router-dom";
import { Spark } from "@/components/Doodles";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "text-[17px]",
  md: "text-[19px] sm:text-[26px]",
  lg: "text-[27px] sm:text-[36px]",
  xl: "text-[34px] sm:text-[46px]",
};

export default function Logo({ size = "md", withSpark = false, to = "/", className = "" }) {
  const mark = (
    <span className={cn("inline-flex items-baseline gap-[0.16em]", className)}>
      <span className={cn("font-display font-black leading-none tracking-tight text-cocoa", SIZES[size])}>
        Cocoa
      </span>
      <span className={cn("amp-mark", SIZES[size])} aria-hidden="true">
        &amp;
      </span>
      <span className={cn("font-display font-black leading-none tracking-tight text-cocoa", SIZES[size])}>
        Crust
      </span>
      {withSpark && (
        <Spark className="mb-3 ml-0.5 h-3.5 w-3.5 text-tang transition-transform duration-500 group-hover:rotate-90 max-md:mb-2 max-md:h-3 max-md:w-3" />
      )}
    </span>
  );

  return (
    <Link to={to} className="group inline-flex items-baseline" aria-label="Cocoa & Crust — home">
      {mark}
    </Link>
  );
}