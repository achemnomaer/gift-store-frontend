import ProductSkeleton from "./ProductSkeleton";

export default function FeaturedSkeleton() {
  return (
    <>
      <div className="border-b border-gray-200 pb-3 w-full mt-6">
        <div className="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>
      </div>
      <div className="mt-10 flex gap-x-4 overflow-x-scroll lg:overflow-auto lg:grid lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
        {[0, 1, 2, 3, 4, 5].map((item, index) => (
          <div key={index} className="">
            <ProductSkeleton />
          </div>
        ))}
      </div>
    </>
  );
}
