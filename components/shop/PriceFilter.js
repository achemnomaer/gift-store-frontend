import { getPriceQueryParams } from "@/lib";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function PriceFilter() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const priceParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (priceParams.get("min_price") || priceParams.get("max_price")) {
      setMin(priceParams.get("min_price"));
      setMax(priceParams.get("max_price"));
    } else {
      setMin("");
      setMax("");
    }
  }, [priceParams]);

  let queryParams;
  function handleButtonClick() {
    queryParams = new URLSearchParams(priceParams);
    queryParams.set("page", "1");

    queryParams = getPriceQueryParams(queryParams, "min_price", min);
    queryParams = getPriceQueryParams(queryParams, "max_price", max);

    replace(`${pathname}?${queryParams.toString()}`);
  }
  return (
    <div className=" px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
      <h3 className="font-semibold mb-2">Price ($)</h3>
      <div className="flex flex-col gap-y-2">
        <div className="mb-4">
          <input
            name="min"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            name="max"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            className="px-1 py-2 text-center w-full inline-block text-white bg-primary border border-transparent rounded-md hover:bg-primary-hover"
            onClick={handleButtonClick}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
