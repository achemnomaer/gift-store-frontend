const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export function normalizeImageUrl(imageUrl) {
  if (imageUrl.startsWith("/media")) {
    // Convert relative URL to absolute URL
    return `${backendUrl}${imageUrl}`;
  }
  // If it's already an absolute URL, return as is
  return imageUrl;
}

// Reviews related calculations
export function calculateReviews(reviews) {
  const totalReviews = reviews.length;

  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    ratingCounts[review.rating]++;
  });

  let totalSum = 0;

  // Calculate the sum of all ratings multiplied by their counts
  for (const rating in ratingCounts) {
    const count = ratingCounts[rating];
    totalSum += parseInt(rating) * count; // Multiply rating by its count and add to totalSum
  }

  // Calculate the average rating
  const averageRating = (totalSum / totalReviews).toFixed(1);

  return { totalReviews, ratingCounts, averageRating };
}

export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const getPriceQueryParams = (queryParams, key, value) => {
  const hasValueInParam = queryParams.has(key);

  if (value && hasValueInParam) {
    queryParams.set(key, value);
  } else if (value) {
    queryParams.append(key, value);
  } else if (hasValueInParam) {
    queryParams.delete(key);
  }
  return queryParams;
};
