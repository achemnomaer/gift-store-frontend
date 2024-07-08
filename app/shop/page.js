import ShopSkeleton from "@/components/skeletons/ShopSkeleton";
import { Suspense } from "react";
import Main from "./Main";

export default function Shop({ searchParams }) {
  const query = searchParams;

  return (
    <Suspense fallback={<ShopSkeleton />}>
      <Main query={query} title="SHOP" />
    </Suspense>
  );
}
