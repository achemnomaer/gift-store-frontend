"use client";

import { useCartContext } from "@/context/CartContext";
import Image from "next/image";

// components
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import Link from "next/link";

export default function Cart() {
  const { addItemToCart, deleteItemFromCart, cart, getTotalItems } =
    useCartContext();
  const totalItems = getTotalItems();

  return (
    <div className="flex h-full flex-col ">
      <div className="flex-1 py-6 ">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-semibold  text-gray-900">
            Shopping cart
          </h2>
          <span className="font-medium text-slate-500">
            {totalItems} Item(s) in Cart
          </span>
        </div>

        {cart?.cartItems?.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-y-6 gap-x-6">
            {/* Cart items */}
            <ul
              role="list"
              className="w-full -my-6 mt-4 divide-y divide-gray-200 "
            >
              {cart?.cartItems?.length > 0 &&
                cart?.cartItems.map((product, index) => (
                  <CartItem key={index} product={product} />
                ))}
            </ul>

            {/* order summary */}
            <div className="w-full ">
              <OrderSummary />
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="flex flex-col gap-y-6 mx-auto my-auto">
              <div className="mx-auto">
                <Image
                  src="/empty-cart.png"
                  width={100}
                  height={80}
                  alt="empty cart image"
                />
              </div>
              <h2 className="text-lg text-center font-semibold">
                Your cart is currently empty
              </h2>
              <Link
                href="/shop"
                className="px-4 py-2 mx-auto max-w-2xs bg-primary hover:bg-primary-hover text-slate-50 font-medium text-center"
              >
                RETURN TO SHOP
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
