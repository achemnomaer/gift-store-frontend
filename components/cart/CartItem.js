import { useCartContext } from "@/context/CartContext";
import { normalizeImageUrl } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import { HiX } from "react-icons/hi";

export default function CartItem({ product }) {
  const { addItemToCart, deleteItemFromCart } = useCartContext();

  const handleIncrease = () => {
    const newQty = product?.quantity + 1;
    const item = { ...product, quantity: newQty };

    if (newQty > Number(product.stock)) return;

    addItemToCart(item);
  };

  const handleDecrease = () => {
    const newQty = product?.quantity - 1;
    const item = { ...product, quantity: newQty };

    if (newQty <= 0) return;

    addItemToCart(item);
  };
  return (
    <li className="flex py-6 gap-x-6 sm:gap-x-8 lg:gap-x-20">
      {/* Product image */}
      <div className="my-auto h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          width={50}
          height={50}
          src={
            product.product_image
              ? `${normalizeImageUrl(product.product_image)}`
              : "/no-image.jpg"
          }
          alt="product image"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className=" flex flex-1 flex-col gap-y-2">
        <div className="flex justify-between">
          {/* product name */}
          <h3 className=" font-semibold">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Remove button */}
          <button
            onClick={() => deleteItemFromCart(product?.slug)}
            className=""
          >
            <HiX />
          </button>
        </div>

        {/* Unit price */}
        <div className="flex justify-between pb-2 border-b border-dashed border-b-slate-200">
          <span className="text-xs font-medium">PRICE</span>
          <span className="text-slate-600 text-sm">${product.price}</span>
        </div>

        {/* product quantity control */}
        <div className="flex justify-between pb-2 border-b border-dashed border-b-slate-200">
          <span className="text-xs font-medium py-auto">QUANTITY</span>
          <div className="flex items-center text-sm">
            <button
              className="bg-primary text-white px-2 py-0.5 rounded-l"
              onClick={handleDecrease}
            >
              -
            </button>
            <div className="bg-gray-100 px-3 py-0.5">{product.quantity}</div>
            <button
              className="bg-primary text-white px-2 py-0.5 rounded-r"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between ">
          <span className="text-xs font-medium">SUBTOTAL</span>
          <span className="text-slate-600 text-sm">
            ${(product.price * product.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
}
