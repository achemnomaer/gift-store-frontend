"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "../common/Logout";

const navLinks = [
  {
    name: "Dashboard",
    href: "/account",
  },
  {
    name: "Order History",
    href: "/account/order-history",
  },
  {
    name: "Manage Addresses",
    href: "/account/addresses",
  },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-2">
        {navLinks.map((link) => {
          const isActive = pathname == link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`py-2 px-4 text-sm ${
                isActive ? "bg-primary text-white" : "hover:bg-slate-200"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-6 ">
        <Logout type="normal" />
      </div>
    </div>
  );
}
