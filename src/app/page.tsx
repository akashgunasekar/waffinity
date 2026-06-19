import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import OfferBanner from "@/components/OfferBanner";
import MenuList from "@/components/MenuList";
import MenuMarquee from "@/components/MenuMarquee";
import NewArrivals from "@/components/NewArrivals";
import ReviewsSection from "@/components/ReviewsSection";
import LocationsSection from "@/components/LocationsSection";

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden bg-[#1a110a] min-h-screen">
      <HeroSection />
      <MenuMarquee />
      <AboutSection />
      
      <OfferBanner />
      <MenuList />
      <NewArrivals />
      <ReviewsSection />
      <LocationsSection />
    </div>
  );
}
