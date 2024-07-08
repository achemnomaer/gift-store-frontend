import { normalizeImageUrl } from "@/lib";
import Image from "next/image";
import Link from "next/link";

export default function OrderedItem({ item }) {
  const { price, quantity } = item;
  const { name, slug, product_image } = item["product"];

  return (
    <div className="w-full px-3 min-[400px]:px-6">
      <li className="flex py-6 gap-x-6 sm:gap-x-8 lg:gap-x-20">
        {/* Product image */}
        <div className="my-auto h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <Image
            width={50}
            height={50}
            src={
              product_image
                ? `${normalizeImageUrl(product_image)}`
                : "/no-image.jpg"
            }
            alt="product image"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className=" flex flex-1 flex-col gap-y-2">
          <div className="flex justify-between gap-x-2">
            {/* product name */}
            <h3 className=" font-semibold">
              <Link href={`/product/${slug}`}>{name}</Link>
            </h3>
            <span className="text-slate-600 text-sm">${price}</span>
          </div>

          {/* product quantity  */}
          <div className="flex justify-between  border-b border-dashed border-b-slate-200">
            <span className="text-xs font-medium py-auto">QUANTITY</span>

            <span className="text-slate-600">{quantity}</span>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between ">
            <span className="text-xs font-medium">SUBTOTAL</span>
            <span className="text-slate-600 text-sm">
              ${(price * quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </li>
    </div>
  );
}
