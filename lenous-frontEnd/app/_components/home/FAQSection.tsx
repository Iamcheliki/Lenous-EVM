import Link from "next/link";
import Icon from "../UI/icon";

export default function FAQSection() {
  return (
    <div className="index-container text-white mt-36">
      <div className="flex justify-between">
        <div className="text-5xl font-extralight">
          <div>FAQs</div>
          <div className="text-primary">FAQs</div>
        </div>
        <div>
          <div className="text-primary">have a Questions?</div>
          <Link
            className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
            href="#"
          >
            Contact us
          </Link>
        </div>
      </div>
      <div className="mt-12">
        <div className="p-6 rounded-6xl flex justify-between items-center border border-white-bg-30 mt-4">
          <div className="text-3xl font-thin">
            Is Lenous a safe cryptocurrency exchange?
          </div>
          <div>
            <Icon name="plus" />
          </div>
        </div>
        <div className="p-6 rounded-6xl flex justify-between items-center border border-white-bg-30 mt-4">
          <div className="text-3xl font-thin">
            Can I start trading with just $1?
          </div>
          <div>
            <Icon name="plus" />
          </div>
        </div>
        <div className="p-6 rounded-6xl flex justify-between items-center border border-white-bg-30 mt-4">
          <div className="text-3xl font-thin">
            Is there an exchange limit between fiat and crypto?
          </div>
          <div>
            <Icon name="plus" />
          </div>
        </div>
      </div>
    </div>
  );
}
