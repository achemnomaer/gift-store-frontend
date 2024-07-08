import ProductCard from "../common/ProductCard";

export default function Products({ products }) {
  return (
    <div className="bg-white mt-6">
      <div className="mx-auto ">
        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 ">
          {products &&
            products.map((product) => (
              <div key={product.id} className="">
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
