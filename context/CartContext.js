"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const router = useRouter;

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart = async ({
    id,
    slug,
    name,
    price,
    product_image,
    stock,
    quantity = 1,
  }) => {
    const item = {
      id,
      slug,
      name,
      price,
      product_image,
      stock,
      quantity,
    };

    const isItemExist = cart?.cartItems?.find((i) => i.slug === item.slug);

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.slug === isItemExist.slug ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (slug) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.slug !== slug);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const getTotalItems = () => {
    let totalItems = 0;
    cart?.cartItems?.forEach((item) => {
      totalItems += item.quantity;
    });
    return totalItems;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
}
