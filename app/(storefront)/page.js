import CategorySkeleton from "@/components/skeletons/CategorySkeleton";
import FeaturedSkeleton from "@/components/skeletons/FeaturedSkeleton";
import FeaturedProducts from "@/components/storefront/FeaturedProducts";
import GiftByCategories from "@/components/storefront/GiftByCategories";
import GiftByOccasion from "@/components/storefront/GiftByOccasion";
import Hero from "@/components/storefront/Hero";
import Incentives from "@/components/storefront/Incentives";

import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="">
      <div>
        <Hero />
      </div>

      {/* Featured Products */}
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      {/* Gifts by categories section */}
      <Suspense fallback={<CategorySkeleton />}>
        <GiftByCategories />
      </Suspense>

      {/* Gifts by occasion section */}
      <Suspense fallback={<CategorySkeleton />}>
        <GiftByOccasion />
      </Suspense>

      <div>
        <Incentives />
      </div>
    </div>
  );
}
