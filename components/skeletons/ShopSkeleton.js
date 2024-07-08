import ProductSkeleton from "./ProductSkeleton";

export default function ShopSkeleton() {
  return (
    <>
      <div className="border-b border-gray-200 pb-3 w-full mt-6">
        <div className="h-2.5 bg-gray-200 rounded-full w-full mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full w-full mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full w-full mb-4"></div>
      </div>
      <div className=" mt-6">
        <div className="mx-auto ">
          <div className="mt-6 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 ">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div key={index} className="">
                <ProductSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
