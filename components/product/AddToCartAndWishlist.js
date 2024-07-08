"use client";

import { normalizeImageUrl } from "@/lib";
import { useState } from "react";
import AddToCart from "../common/AddToCart";
import AddToWishlist from "../common/AddToWishlist";

export default function AddToCartAndWishlist({ product }) {
  const [quantity, setQuantity] = useState(1);

  const { id, slug, name, discounted_price, primary_image, stock_quantity } =
    product;

  const handleIncrease = () => {
    if (quantity < stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    addItemToCart({
      id: id,
      slug: slug,
      name: name,
      price: discounted_price,
      image: primary_image ? normalizeImageUrl(primary_image) : "",
      stock: stock_quantity,
      quantity: quantity,
    });
  };

  return (
    <div className="mt-6 flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-3 ">
        <span className=" font-medium">QUANTITY</span>
        <div className="flex items-center ">
          <button
            className="bg-primary text-white px-2 py-0.5 rounded-l"
            onClick={handleDecrease}
          >
            -
          </button>
          <div className="bg-gray-100 px-3 py-0.5">{quantity}</div>
          <button
            className="bg-primary text-white px-2 py-0.5 rounded-r"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex gap-x-2 w-full">
        <AddToCart product={product} quantity={quantity} isWishlist={false} />
        <AddToWishlist product={product} />
      </div>
    </div>
  );
}
