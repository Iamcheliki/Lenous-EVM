"use client";

import Image from "next/image";
import Link from "next/link";
import RightNav from "./RightNav";
import { usePathname } from "next/navigation";

const menuData = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/trade",
    name: "Trade",
  },
  {
    href: "/swap",
    name: "Swap",
  },
  {
    href: "/pool",
    name: "Pool",
  },
];

const NavBar = () => {
  const pathName = usePathname();
  return (
    <div className="container flex justify-between items-center py-3">
      <div className="headerLeft flex items-center">
        <Image
          src="/images/Platform_Logo.svg"
          width="110"
          height="42"
          alt="lenous"
        />
        <div className="mainMenu ml-8">
          <ul className="flex  text-neutral-light">
            {menuData.map((item) => (
              <li
                key={item.href + item.name}
                className={
                  "p-4 " +
                  (pathName === item.href ? "text-primary" : "text-white")
                }
              >
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="headerRight ">
        <RightNav />
      </div>
    </div>
  );
};
export default NavBar;
