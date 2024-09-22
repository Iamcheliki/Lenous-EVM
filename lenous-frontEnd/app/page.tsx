"use client";
import HeroSection from "./_components/home/HeroSection";
import FindSection from "./_components/home/FindSection";
import MarketSection from "./_components/home/MarketSection";
import ExchnageSection from "./_components/home/ExchangeSection";
import ExploreSection from "./_components/home/ExploreSection";
import TrustSection from "./_components/home/TrustSection";
import SideSection from "./_components/home/SideSection";
import FAQSection from "./_components/home/FAQSection";

export default async function Home() {
  return (
    <main className="min-h-screen italic ">
      <HeroSection />
      <FindSection />
      <MarketSection />
      <ExchnageSection />
      <ExploreSection />
      <TrustSection />
      <SideSection />
      <FAQSection />
    </main>
  );
}
