import ReviewForm from "@/components/product/ReviewForm";
import ReviewSummary from "@/components/product/ReviewSummary";
import Reviews from "@/components/product/Reviews";
import { calculateReviews } from "@/lib";
import { getReviews } from "@/lib/data/getData";

export default async function ReviewsSection({ productSlug }) {
  const reviews = await getReviews(productSlug);

  const { totalReviews, ratingCounts, averageRating } =
    calculateReviews(reviews);
  return (
    <div className="mt-16 w-full max-w-4xl">
      <h2 className="text-2xl font-semibold text-slate-700 pl-3 border-l-4 border-l-primary">
        Customer Reviews
      </h2>

      {/* Review submission */}
      <div>
        <ReviewForm productSlug={productSlug} />
      </div>

      {/* Reviews summary */}
      {totalReviews > 0 && (
        <div>
          <ReviewSummary
            totalReviews={totalReviews}
            ratingCounts={ratingCounts}
            averageRating={averageRating}
          />
        </div>
      )}

      {/* Reviews */}
      {totalReviews > 0 ? (
        <div>
          <Reviews reviews={reviews} />
        </div>
      ) : (
        <div className="mt-8 px-8 font-semibold">There are no reviews yet</div>
      )}
    </div>
  );
}
