import { transformSlug } from "@/lib/transformSlug";

import ShopSkeleton from "@/components/skeletons/ShopSkeleton";
import { Suspense } from "react";
import Main from "../Main";

export default async function ShopByCategory({ params, searchParams }) {
  const { category } = params;

  const query = {
    category,
    ...searchParams,
  };

  const title = transformSlug(category);

  return (
    <Suspense fallback={<ShopSkeleton />}>
      <Main query={query} title={title} />
    </Suspense>
  );
}
