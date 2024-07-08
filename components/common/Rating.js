import classNames from "classnames";
import { HiStar } from "react-icons/hi2";

export default function Rating({ averageRating }) {
  return (
    <>
      {averageRating > 0 ? (
        <div className=" flex gap-x-2">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <HiStar
                key={rating}
                className={classNames(
                  averageRating > rating ? "text-yellow-500" : "text-gray-200",
                  "h-5 w-5 flex-shrink-0"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <span>{averageRating}</span>
        </div>
      ) : (
        <div className="text-sm text-slate-700 font-medium">No reviews yet</div>
      )}
    </>
  );
}
