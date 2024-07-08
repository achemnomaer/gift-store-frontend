import AddToCartAndWishlist from "@/components/product/AddToCartAndWishlist";
import ProductImages from "@/components/product/ProductImages";
import { getProductDetail } from "@/lib/data/getData";
import htmlSanitizer from "@/lib/htmlSanitizer";
import classNames from "classnames";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { HiStar } from "react-icons/hi2";

export default async function ProductDetailSection({ productSlug }) {
  const product = await getProductDetail(productSlug);
  const {
    id,
    name,
    details,
    price,
    description,
    stock_quantity,
    discounted_price,
    product_image,
    average_rating,
  } = product;

  const sanitizedDetails = htmlSanitizer(details);

  const discountPercentage = Math.round(
    (100 * (price - discounted_price)) / price
  );

  let convertedDescription;

  if (description) {
    const cleanedDescription = DOMPurify.sanitize(description);
    convertedDescription = parse(cleanedDescription);
  }
  return (
    <>
      <div className=" flex flex-col gap-y-10 md:flex-row gap-x-16 lg:gap-x-24">
        {/* Image gallery  */}
        <div className="w-full relative">
          <ProductImages main_image={product_image} />
          <div className="absolute top-0 left-0 m-2 rounded-full bg-red-700 px-2 text-center text-sm font-medium text-white">
            {discountPercentage}% OFF
          </div>
        </div>

        <div className="w-full">
          {/* Product info */}
          <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-800 sm:text-3xl">
              {name}
            </h1>

            {/* product price */}
            <p>
              <span className="text-3xl font-bold text-red-600">
                ${discounted_price}
              </span>
              <span className="text-sm text-slate-900 line-through">
                ${price}
              </span>
            </p>

            {/* Reviews */}
            {average_rating > 0 ? (
              <div className=" flex gap-x-2">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <HiStar
                      key={rating}
                      className={classNames(
                        average_rating > rating
                          ? "text-yellow-500"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span>{average_rating} out of 5</span>
              </div>
            ) : (
              "No reviews yet"
            )}

            {convertedDescription && (
              <div className=" content prose md:prose-lg  leading-loose antialiased">
                {convertedDescription}
              </div>
            )}
          </div>

          <div>
            <AddToCartAndWishlist product={product} />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-16 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-slate-700 pl-3 border-l-4 border-l-primary">
          Product Details
        </h2>

        <div className="mt-8 content prose md:prose-lg  leading-loose antialiased">
          {sanitizedDetails}
        </div>
      </div>
    </>
  );
}
