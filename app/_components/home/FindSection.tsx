import Image from "next/image";
import Link from "next/link";

export default function FindSection() {
  return (
    <section className="index-container mt-28 flex justify-between text-white">
      <div>
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="text-primary text-3xl font-extralight ">
              Find the Next
            </div>
            <div className="text-4xl font-bold mt-2">Crypto Gem on Lenous</div>
            <div className="text-2xl font-extralight mt-10">
              1 Out of 4 Crypto Holders Worldwide Is with Lenous
            </div>
          </div>
          <div>
            <div className="text-xl font-extralight ">
              Scan QR Code to Download App
            </div>
            <Link
              className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
              href="#"
            >
              Veiw more
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/index/ios&android.png"
          alt={"ios&android"}
          width={450}
          height={405}
        />
      </div>
    </section>
  );
}
