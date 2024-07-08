import ProductDetailSkeleton from "@/components/skeletons/ProductDetailSkeleton";
import ReviewSkeleton from "@/components/skeletons/ReviewSkeleton";
import { Suspense } from "react";
import ProductDetailSection from "../ProductDetailSection";
import ReviewsSection from "../ReviewsSection";

export default async function ProductDetail({ params }) {
  const { product_slug } = params;

  return (
    <div className=" pt-16">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailSection productSlug={product_slug} />
      </Suspense>

      {/* Customer Reviews */}
      <Suspense fallback={<ReviewSkeleton />}>
        <ReviewsSection productSlug={product_slug} />
      </Suspense>
    </div>
  );
}
