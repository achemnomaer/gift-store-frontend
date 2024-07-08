"use client";
import AddToCart from "@/components/common/AddToCart";
import { useWishContext } from "@/context/WishlistContext";
import { normalizeImageUrl } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import { HiMiniXMark } from "react-icons/hi2";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Wishlist() {
  const { wish, deleteItemFromWishlist } = useWishContext();
  const wishlist = wish?.wishItems;
  const totalItems = wishlist?.length;
  return (
    <div className="mt-6">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-semibold  text-gray-900">Wishlist</h2>
        <span className="font-medium text-slate-500">
          {totalItems} Item(s) in wishlist
        </span>
      </div>
      {wishlist?.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {wishlist?.map((item) => {
            const { id, name, slug, product_image, price, discounted_price } =
              item;

            const discountPercentage = Math.round(
              (100 * (price - discounted_price)) / price
            );
            return (
              <div key={id} className="flex flex-col gap-y-2">
                {/* Button for deleting item from wishlist */}
                <button
                  onClick={() => deleteItemFromWishlist(slug)}
                  className="mx-auto flex font-semibold hover:text-red-500"
                >
                  <span className="my-auto">
                    <HiMiniXMark className="w-5 h-5" />
                  </span>
                  <span className="my-auto">Remove</span>
                </button>
                <div className="relative flex w-full min-w-[220px]  max-w-[350px] flex-col overflow-hidden  border border-gray-100 bg-white shadow-md">
                  {/* Product image */}
                  <Link
                    href={`/product/${slug}`}
                    className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200  group-hover:opacity-75 "
                  >
                    <Image
                      src={
                        product_image
                          ? `${normalizeImageUrl(product_image)}`
                          : "/no-image.jpg"
                      }
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt="product image"
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </Link>

                  <div className="mt-4  pb-5 mx-3">
                    {/* product name */}
                    <Link href={`/product/${slug}`}>
                      <h5 className="font-semibold text-black">{name}</h5>
                    </Link>

                    <div className="mt-2 mb-5 flex flex-col gap-y-1 ">
                      {/* product price */}
                      <p>
                        <span className=" font-medium text-slate-800">
                          ${discounted_price}
                        </span>
                        <span className="ml-2 text-sm text-slate-700 line-through">
                          ${price}
                        </span>
                      </p>
                    </div>

                    {/* Add to cart button, Quick view button and Add to wishlist button */}
                    <div className="flex gap-x-2 w-full">
                      <AddToCart
                        product={item}
                        quantity={1}
                        isWishlist={true}
                      />
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 m-2 rounded-full bg-red-700 px-2 text-center text-sm font-medium text-white">
                    {discountPercentage}% OFF
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-10  font-medium">
          You have not added any item in your wishlist
        </div>
      )}
    </div>
  );
}
