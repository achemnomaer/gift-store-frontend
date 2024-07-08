"use client";

import { useWishContext } from "@/context/WishlistContext";
import { normalizeImageUrl } from "@/lib";
import { useState } from "react";
import { HiHeart } from "react-icons/hi2";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AddToWishlist({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addItemToWishlist } = useWishContext();

  const addToWishlistHandler = () => {
    setIsLoading(true);
    addItemToWishlist({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      discounted_price: product.discounted_price,
      stock: product.stock_quantity,
      product_image: product.product_image
        ? normalizeImageUrl(product.product_image)
        : "",
    });
    toast.success("Item added to your wishlist successfully!");
    setIsLoading(false);
  };

  return (
    <button
      onClick={addToWishlistHandler}
      type="button"
      className="inline-flex items-center px-2 py-2  text-gray-900 bg-white border  border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
    >
      {isLoading ? <Spinner md /> : <HiHeart className="w-5 h-5" />}
    </button>
  );
}
