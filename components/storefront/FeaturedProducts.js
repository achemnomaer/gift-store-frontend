import { getFeaturedProducts } from "@/lib/data/getData";
import ProductCard from "../common/ProductCard";

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {featuredProducts?.length > 0 && (
        <section className="mt-16">
          <h2 className="text-center mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
            Featured Products
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
