import { CartProvider } from "@/context/CartContext";
import { WishProvider } from "@/context/WishlistContext";

export function GlobalProvider({ children }) {
  return (
    <WishProvider>
      <CartProvider>{children}</CartProvider>
    </WishProvider>
  );
}
