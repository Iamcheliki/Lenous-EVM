import Link from "next/link";
import Icon from "../UI/icon";

export default function TrustSection() {
  return (
    <section className="index-container text-white mt-36">
      <div className="text-center">
        <div className="text-5xl font-bold">
          Your Safe and Trusted Crypto Exchange
        </div>
        <Link
          className="inline-block mt-6 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
          href="#"
        >
          Learn more
        </Link>
      </div>
      <div className="mt-28">
        {/* Safe & Secure */}
        <div className="p-16 px-20  rounded-6xl bg-primary-gradient">
          <div className="flex items-center">
            <div className="relative pr-4">
              <div className="w-[90px] h-[90px] bg-primary flex items-center justify-center rounded-4xl relative z-10">
                <Icon name="openLock" />
              </div>
              <div className="absolute w-[90px] h-[90px] bg-primary-dark rounded-4xl -top-4 -left-4"></div>
            </div>
            <div>
              <div className="text-primary text-2xl font-light">
                Safe & Secure
              </div>
              <div className="text-4xl mt-2 font-extralight">
                Secure Asset Storage
              </div>
            </div>
          </div>
          <div className="font-extralight mt-6">
            Our industry-leading encryption and storage systems ensure that your
            assets are always safe and secure.
          </div>
        </div>
        {/*Trustworthy*/}
        <div className="p-16 px-20  rounded-6xl bg-primary-gradient mt-12 ml-24">
          <div className="flex items-center">
            <div className="relative pr-4">
              <div className="w-[90px] h-[90px] bg-primary flex items-center justify-center rounded-4xl relative z-10">
                <Icon name="security" />
              </div>
              <div className="absolute w-[90px] h-[90px] bg-primary-dark rounded-4xl -top-4 -left-4"></div>
            </div>
            <div>
              <div className="text-primary text-2xl font-light">
                Trustworthy
              </div>
              <div className="text-4xl mt-2 font-extralight">
                Strong Account Security
              </div>
            </div>
          </div>
          <div className="font-extralight mt-6">
            Our industry-leading encryption and storage systems ensure that your
            assets are always safe and secure.
          </div>
        </div>
        {/* Ten years of service */}
        <div className="p-16 px-20  rounded-6xl bg-primary-gradient mt-12 ">
          <div className="flex items-center">
            <div className="relative pr-4">
              <div className="w-[90px] h-[90px] bg-primary flex items-center justify-center rounded-4xl relative z-10">
                <Icon name="trust" />
              </div>
              <div className="absolute w-[90px] h-[90px] bg-primary-dark rounded-4xl -top-4 -left-4"></div>
            </div>
            <div>
              <div className="text-primary text-2xl font-light">
                Ten years of service
              </div>
              <div className="text-4xl mt-2 font-extralight">
                Trusted Platform
              </div>
            </div>
          </div>
          <div className="font-extralight mt-6">
            We have a secure-by-design foundation in place to ensure rapid
            detection and response to any cyber attacks.
          </div>
        </div>
        {/* Update methods */}
        <div className="p-16 px-20 rounded-6xl bg-primary-gradient mt-12 ml-24 ">
          <div className="flex items-center">
            <div className="relative pr-4">
              <div className="w-[90px] h-[90px] bg-primary flex items-center justify-center rounded-4xl relative z-10">
                <Icon name="fingerPrint" />
              </div>
              <div className="absolute w-[90px] h-[90px] bg-primary-dark rounded-4xl -top-4 -left-4"></div>
            </div>
            <div>
              <div className="text-primary text-2xl font-light">
                Update methods
              </div>
              <div className="text-4xl mt-2 font-extralight">
                PoR — Asset Transparency
              </div>
            </div>
          </div>
          <div className="font-extralight mt-6">
            PoR (Proof of Reserves) is a widely used method to prove custody of
            assets on the blockchain, confirming that KuCoin has the funds that
            cover all user assets on our books.
          </div>
        </div>
      </div>
    </section>
  );
}
