import { useCartContext } from "@/context/CartContext";
import { backend_secret_key } from "@/lib/constant";
import stripePromise from "@/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function calculateTotalPrice(products) {
  let totalPrice = 0;
  products.map((product) => {
    const price = parseFloat(product.price);
    const quantity = parseFloat(product.quantity);
    totalPrice += price * quantity;
  });
  return totalPrice;
}

export default function OrderSummary({ userId, formData }) {
  const [isLoading, setIsLoading] = useState(false);
  const { cart, clearCart } = useCartContext();
  const router = useRouter();

  const totalPrice = !cart
    ? 0
    : cart.cartItems
    ? calculateTotalPrice(cart.cartItems)
    : 0;
  const shippingCost = 10;
  const grandTotal = totalPrice + shippingCost;

  const proceedToPayment = async () => {
    const paymentData = {
      price: grandTotal * 100,
      product_name: "Test",
      description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    };

    axios
      .post(`${backendUrl}/payment/create-checkout-session/`, paymentData, {
        headers: {
          "Content-Type": "application/json",
          "X-Frontend-Secret-Key": backend_secret_key,
        },
      })
      .then((res) => {
        setIsLoading(false);
        const checkoutUrl = res.data.url;
        router.push(checkoutUrl);
      })
      .catch((err) => {
        toast.error("Something is going wrong. Can not proceed to payment!");
        setIsLoading(false);
      });
  };

  async function handleOrderSubmit() {
    setIsLoading(true);

    const cartItems = cart.cartItems;

    const convertedCartItems = cartItems.map((item) => ({
      product: parseInt(item.id),
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity),
    }));

    const orderData = {
      user: userId,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      address: formData.address,
      postal_code: formData.postalCode,
      city: formData.city,
      total_amount: grandTotal,
      items: convertedCartItems,
    };

    try {
      const response = await fetch(`${backendUrl}/api/orders/place-order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Frontend-Secret-Key": backend_secret_key,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast.success("Your order have been placed successfully!");
        toast.info("You are proceeding to payment...");
        await clearCart();
        await proceedToPayment();
      } else {
        console.log(response);
        toast.error("Something is going wrong!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is going wrong");
      setIsLoading(false);
    }
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="bg-gray-100 rounded-md px-4 py-6 mx-3 my-5">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-xl font-semibold pb-3 text-center">
            ORDER SUMMARY
          </h2>
          <div className="flex justify-between border-b border-b-slate-200 pb-3">
            <p className="font-medium">PRODUCT</p>
            <p className="font-medium">SUBTOTAL</p>
          </div>

          {cart?.cartItems?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-b-slate-200 pb-3 text-sm"
            >
              <p className="text-gray-700">
                {item.name} &times; {item.quantity}
              </p>
              <p className=" text-gray-500">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="flex justify-between border-b border-b-slate-200 pb-3 text-sm">
            <p className="text-gray-700 ">Subtotal</p>
            <p className="text-gray-900">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b border-b-slate-200 pb-3 text-sm">
            <p className="text-gray-700 ">Shipping cost</p>
            <p className="text-gray-900">${shippingCost.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-xl font-semibold">
            <p>Total</p>
            <p>${grandTotal.toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleOrderSubmit()}
              className="flex w-full justify-center text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2"
            >
              {isLoading ? (
                <Spinner md />
              ) : (
                "Place Order and Proceed to Payment"
              )}
            </button>
          </div>
        </div>
      </div>
    </Elements>
  );
}
