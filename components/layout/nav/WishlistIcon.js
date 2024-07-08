"use client";

import { useWishContext } from "@/context/WishlistContext";
import Link from "next/link";
import { RiHeartLine } from "react-icons/ri";

export default function WishlistIcon() {
  const { wish } = useWishContext();
  const totalItems = wish?.wishItems?.length || 0;
  return (
    <div className="ml-4 flow-root lg:ml-6">
      <Link href="/wishlist" className="group -m-2 flex items-center p-2">
        <RiHeartLine
          className="h-7 w-7 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="-ml-2 -mt-4 z-10 px-1 py-0.5 text-xs font-bold bg-primary text-white rounded-sm">
          {totalItems}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </Link>
    </div>
  );
}
