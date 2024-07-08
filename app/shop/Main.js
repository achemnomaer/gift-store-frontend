import Pagination from "@/components/common/Pagination";
import Header from "@/components/shop/Header";
import Products from "@/components/shop/Products";

import { getProducts } from "@/lib/data/getData";

export default async function Main({ query, title }) {
  const products = await getProducts(query);

  const totalResults = products["total_count"];

  const totalPages = Math.ceil(totalResults / 20);

  return (
    <div className="w-full">
      <Header title={title} resultsCount={totalResults} />
      <Products products={products["results"]} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
