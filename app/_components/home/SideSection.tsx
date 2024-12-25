import Link from "next/link";
import Icon from "../UI/icon";

export default function SideSection() {
  return (
    <section className="index-container text-white mt-36">
      <div className="text-5xl font-bold ">LENOUS by Your Side</div>
      <div className="grid grid-cols-2 gap-6 mt-20">
        <div>
          <div className="border border-white-bg-15 rounded-6xl flex flex-col justify-between p-12 h-[500px]">
            <div>
              <div className="text-4xl font-extralight">24/7 Support Chat</div>
              <div className="text-xl mt-6 font-extralight">
                Your questions, answered. Contact KuCoin customer support with
                your questions at any time.
              </div>
            </div>
            <div>
              <Link
                className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
                href="#"
              >
                LENOUS Help Center
              </Link>
            </div>
          </div>
          <div className="linearShadow relative h-11 -mt-2.5">
            <div className="h-11 left-14 right-14 absolute top-2 opacity-15 bg-colorfull-gradient box-shadow-[75px_75px_75px] blur-34"></div>
            <div className="h-px left-14 right-14 absolute top-2 bg-colorfull-gradient"></div>
          </div>
        </div>
        <div>
          <div className="border border-white-bg-15 rounded-6xl flex flex-col justify-between p-12 h-[500px]">
            <div>
              <div className="text-4xl font-extralight">Join Our Community</div>
              <div className="text-xl mt-6 font-extralight">
                The KuCoin Global Community is home to millions of users from
                200+ countries, with support for 8+ languages.
              </div>
            </div>
            <div>
              <div className="text-2xl">English Community</div>
              <div className="flex gap-4 mt-4">
                <div className="h-16 w-16 flex items-center justify-center bg-radial-gradient-25-5 rounded-full">
                  <Icon name="youtube" />
                </div>
                <div className="h-16 w-16 flex items-center justify-center bg-radial-gradient-25-5 rounded-full">
                  <Icon name="noBrand" />
                </div>
                <div className="h-16 w-16 flex items-center justify-center bg-radial-gradient-25-5 rounded-full">
                  <Icon name="github" />
                </div>
                <div className="h-16 w-16 flex items-center justify-center bg-radial-gradient-25-5 rounded-full">
                  <Icon name="x" />
                </div>
                <div className="h-16 w-16 flex items-center justify-center bg-radial-gradient-25-5 rounded-full">
                  <Icon name="facebook" />
                </div>
              </div>
            </div>
            <div>
              <Link
                className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
                href="#"
              >
                View all 8+ languages
              </Link>
            </div>
          </div>
          <div className="linearShadow relative h-11 -mt-2.5">
            <div className="h-11 left-14 right-14 absolute top-2 opacity-15 bg-colorfull-gradient box-shadow-[75px_75px_75px] blur-34"></div>
            <div className="h-px left-14 right-14 absolute top-2 bg-colorfull-gradient"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
