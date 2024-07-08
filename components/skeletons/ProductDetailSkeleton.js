export default function ProductDetailSkeleton() {
  return (
    <div className="mt-10">
      <div className="w-full flex flex-col gap-y-10 md:flex-row gap-x-16 lg:gap-x-24">
        <div className="w-full h-[400px] bg-gray-200 animate-pulse"></div>

        <div className="w-full">
          <div className="flex flex-col gap-y-4">
            <div className="h-4 bg-gray-200 rounded-md  w-full mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md  w-full mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md  w-full mb-4 animate-pulse"></div>
            <div className="h-[200px] bg-gray-200 rounded-md  w-full mb-4 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-y-4 w-full max-w-3xl">
        <div className="h-4 bg-gray-200 rounded-md  w-full mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-md  w-full mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-md  w-full mb-4 animate-pulse"></div>
      </div>
    </div>
  );
}
