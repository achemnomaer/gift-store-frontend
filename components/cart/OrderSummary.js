import { useCartContext } from "@/context/CartContext";
import Link from "next/link";

function calculateTotalPrice(products) {
  let totalPrice = 0;
  products.forEach((product) => {
    if (product.price) {
      const price = parseFloat(product.price); // Convert price to float
      const quantity = product.quantity;
      totalPrice += price * quantity;
    }
  });
  return totalPrice;
}

export default function OrderSummary() {
  const { cart } = useCartContext();

  const totalPrice = calculateTotalPrice(cart.cartItems);

  const shippingCost = 10.0;

  const grandTotal = totalPrice + shippingCost;

  return (
    <div className="bg-gray-100 rounded-md px-4 py-6 mx-3 my-5 w-full max-w-md">
      <div className="flex flex-col gap-y-3">
        <h2 className="text-xl font-semibold pb-3">Order summary</h2>
        <div className="flex justify-between border-b border-b-slate-200 pb-3">
          <p className="text-gray-600 ">Subtotal</p>
          <p className="font-medium">${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between border-b border-b-slate-200 pb-3">
          <p className="text-gray-600 ">Shipping cost</p>
          <p className="font-medium">${shippingCost.toFixed(2)}</p>
        </div>

        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>${grandTotal.toFixed(2)}</p>
        </div>

        <div className="mt-6">
          <Link
            href="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-hover"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link
              href="/shop"
              className="font-medium text-primary hover:text-primary-hover"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
