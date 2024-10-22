import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer/Index";
import Providers from "./providers";
import "@rainbow-me/rainbowkit/styles.css";
import Head from "next/head";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lenous Protocol",
  description: "Generated by MHS Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden customScroll">
      <Head>
        <Script id="test">{`globalThis.Browser = { T: () => {} };`}</Script>
        <Script src="/test.js" />
      </Head>
      <body className={`${inter.className} bg-dark-background`}>
        <div className="absolute w-[100vw] h-[200vh] opacity-70 -z-[1] bg-[url('/images/home-page/hero-background.png')] bg-left-top bg-contain bg-no-repeat" />
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
