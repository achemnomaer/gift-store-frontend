"use client";
import { useCartContext } from "@/context/CartContext";
import { useWishContext } from "@/context/WishlistContext";
import { normalizeImageUrl } from "@/lib";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

export default function AddToCart({ product, quantity, isWishlist }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addItemToCart } = useCartContext();
  const { deleteItemFromWishlist } = useWishContext();
  const { id, name, slug, product_image, discounted_price, stock_quantity } =
    product;

  const addToCartHandler = () => {
    setIsLoading(true);
    addItemToCart({
      id: id,
      slug: slug,
      name: name,
      price: discounted_price,
      product_image: product_image ? normalizeImageUrl(product_image) : "",
      stock: stock_quantity,
      quantity: quantity,
    });

    if (isWishlist) {
      deleteItemFromWishlist(slug);
    }
    toast.success("Item added to cart successfully!");
    setIsLoading(false);
  };
  return (
    <button
      onClick={addToCartHandler}
      disabled={isLoading}
      className="w-full max-w-xs hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-primary hover:bg-primary-hover px-2 py-1.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {isLoading ? <Spinner md /> : "Add to cart"}
    </button>
  );
}
