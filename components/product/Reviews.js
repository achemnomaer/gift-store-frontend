import formatDate from "@/lib/formatDate";
import { StarIcon, UserCircleIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Reviews({ reviews }) {
  return (
    <div>
      {/* Reviews */}
      <div className="flex flex-col gap-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-x-6">
            <div>
              <UserCircleIcon className=" h-10 w-10 flex-shrink-0 text-gray-400 " />
            </div>
            <div className="flex flex-col gap-x-2 flex-wrap pb-8 border-b border-b-slate-200">
              <span className="text-slate-800 text-sm font-medium">
                {review.name}
              </span>
              <span className="text-slate-600 text-sm">
                {formatDate(review.created_at)}
              </span>
              <div className="flex items-center py-2">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      review.rating > rating
                        ? "text-yellow-500"
                        : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="text-sm text-slate ">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
