import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export default function ReviewSummary({
  totalReviews,
  ratingCounts,
  averageRating,
}) {
  return (
    <div className="py-8 flex flex-col gap-y-4">
      <div className="flex gap-x-2">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                averageRating > rating ? "text-yellow-500" : "text-gray-200",
                "h-5 w-5 flex-shrink-0"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <span>{averageRating} out of 5</span>
      </div>

      <div>{totalReviews} ratings</div>

      {[5, 4, 3, 2, 1].map((rating, index) => {
        const reviewPercentage = (ratingCounts[rating] * 100) / totalReviews;

        return (
          <div key={index} className="flex gap-x-3">
            <span className="text-sky-400 my-auto flex-nowrap">
              {rating} star
            </span>
            <div className="my-auto w-full max-w-sm bg-gray-200 rounded-md h-4 dark:bg-gray-700">
              <div
                className="bg-yellow-400 h-4 rounded-md "
                style={{
                  width: `${reviewPercentage}%`,
                }}
              ></div>
            </div>

            <span className="text-sky-400 my-auto flex-nowrap">
              {ratingCounts[rating]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
