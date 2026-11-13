import { Outlet } from "react-router-dom";
import TopMarquee from "@/components/TopMarquee";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <TopMarquee />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}