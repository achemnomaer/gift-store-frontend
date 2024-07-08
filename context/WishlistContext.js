"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const [wish, setWish] = useState([]);

  const router = useRouter;

  useEffect(() => {
    setWishToState();
  }, []);

  const setWishToState = () => {
    setWish(
      localStorage.getItem("wish")
        ? JSON.parse(localStorage.getItem("wish"))
        : []
    );
  };

  const addItemToWishlist = async ({
    id,
    slug,
    name,
    price,
    discounted_price,
    stock,
    product_image,
  }) => {
    const item = {
      id,
      slug,
      name,
      price,
      discounted_price,
      stock,
      product_image,
    };

    const isItemExist = wish?.wishItems?.find((i) => i.slug === item.slug);

    let newWishItems;

    if (isItemExist) {
      newWishItems = wish?.wishItems?.map((i) =>
        i.slug === isItemExist.slug ? item : i
      );
    } else {
      newWishItems = [...(wish?.wishItems || []), item];
    }

    localStorage.setItem("wish", JSON.stringify({ wishItems: newWishItems }));
    setWishToState();
  };

  const deleteItemFromWishlist = (slug) => {
    const newWishItems = wish?.wishItems?.filter((i) => i.slug !== slug);

    localStorage.setItem("wish", JSON.stringify({ wishItems: newWishItems }));
    setWishToState();
  };

  return (
    <WishContext.Provider
      value={{
        wish,
        addItemToWishlist,
        deleteItemFromWishlist,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};

export function useWishContext() {
  const context = useContext(WishContext);
  if (!context) {
    throw new Error("useWishContext must be used within a WishProvider");
  }

  return context;
}
