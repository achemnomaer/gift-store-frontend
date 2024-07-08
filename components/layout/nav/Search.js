"use client";

import Spinner from "@/components/common/Spinner";
import { normalizeImageUrl } from "@/lib";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDebouncedCallback } from "use-debounce";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [finishedQuery, setFinishedQuery] = useState(false);
  const [clickedInside, setClickedInside] = useState(true);
  const searchRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback(async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/search/?search=${searchQuery}`
      );
      setResults(response.data);
      setFinishedQuery(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching search results:", error);
    }
  }, 500);

  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setClickedInside(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseDown = () => {
    setClickedInside(true);
  };

  return (
    <div ref={searchRef} onMouseDown={handleMouseDown} className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <span className="w-5 h-5 pt-1">
            <HiMagnifyingGlass />
          </span>
        </div>
        <input
          value={query}
          onChange={handleChange}
          type="text"
          id="default-search"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-primary focus:border-primary   "
          placeholder="Search Products..."
        />

        {loading && (
          <div className="absolute inset-y-0 end-0 flex items-center pr-3 pointer-events-none">
            <Spinner sm />
          </div>
        )}
      </div>

      {clickedInside && query.trim() !== "" && finishedQuery && !loading && (
        <div className="">
          {results.length > 0 ? (
            <ul className="absolute bg-white border border-gray-300 shadow-md rounded-md mt-1 w-full max-h-96 overflow-y-auto z-40">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="flex gap-x-6 py-5 mx-3 border-b border-b-gray-200 hover:opacity-90"
                  >
                    <div className="">
                      <Image
                        className="object-cover"
                        width={50}
                        height={50}
                        src={
                          product.product_image
                            ? `${normalizeImageUrl(product.product_image)}`
                            : "/no-image.jpg"
                        }
                        alt="product image"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2 my-auto">
                      <p className=" text-gray-700 text-sm font-medum">
                        {product.name}
                      </p>
                      {/* product price */}
                      <p>
                        <span className="text-lg font-medium text-slate-900">
                          ${product.discounted_price}
                        </span>
                        <span className="pl-4 text-sm text-slate-900 line-through">
                          ${product.price}
                        </span>
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="absolute bg-gray-50 border border-gray-300 shadow-md rounded-md mt-1 w-full z-40 p-4 font-medium">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
