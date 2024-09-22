"use client";
import Link from "next/link";
import TopSlider from "./_components/home/TopSlider";
import Script from "next/script";
import Image from "next/image";
import { TokenData } from "@/app/_libs/types/token";
import { tokenList } from "./_libs/utils/constants/TokenList";
import Icon from "./_components/UI/icon";
import HeroSection from "./_components/home/HeroSection";
import FindSection from "./_components/home/FindSection";
import MarketSection from "./_components/home/MarketSection";
import ExchnageSection from "./_components/home/ExchangeSection";
import ExploreSection from "./_components/home/ExploreSection";
import TrustSection from "./_components/home/TrustSection";
import SideSection from "./_components/home/SideSection";
import FAQSection from "./_components/home/FaqSection";

const fetchTokenData = async (tokens: string): Promise<TokenData[]> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokens}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch token data");
    }
    const data: TokenData[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching token data:", error);
    return [];
  }
};

export default async function Home() {
  const tokenIds = tokenList.map((token) => token.id).join(",");
  const tokensPrice = await fetchTokenData(tokenIds);
  console.log(tokensPrice);
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
