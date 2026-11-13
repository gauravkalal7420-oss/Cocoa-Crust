import useMenuItems from "@/hooks/useMenuItems";
import HomeHero from "@/components/home/HomeHero";
import Pillars from "@/components/home/Pillars";
import MainItems from "@/components/home/MainItems";
import Bakehouse from "@/components/home/Bakehouse";
import StoryBand from "@/components/home/StoryBand";
import CakesBand from "@/components/home/CakesBand";
import VisitBand from "@/components/home/VisitBand";

export default function Home() {
  const { items } = useMenuItems();
  const featured = items.filter((item) => item.featured).slice(0, 3);

  return (
    <>
      <HomeHero />
      <Pillars />
      <MainItems items={featured} />
      <Bakehouse />
      <StoryBand />
      <CakesBand />
      <VisitBand />
    </>
  );
}