"use client";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";

const sortOptions = [
  { name: "Newest", sortingParam: "newest" },
  {
    name: "Price: Low to High",
    sortingParam: "priceLowToHigh",
  },
  {
    name: "Price: High to Low",
    sortingParam: "priceHighToLow",
  },
  {
    name: "Rating: Low to High",
    sortingParam: "ratingLowToHigh",
    current: true,
  },
  {
    name: "Rating: High to Low",
    sortingParam: "ratingHighToLow",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SortOptions() {
  const filterParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentSortingParam = filterParams.get("sort_by");

  let queryParams;

  function handleSortingClick(sortingParam) {
    queryParams = new URLSearchParams(filterParams);
    queryParams.set("page", "1");
    queryParams.set("sort_by", sortingParam);

    replace(`${pathname}?${queryParams.toString()}`);
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          Sort
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <button
                    onClick={() => handleSortingClick(option.sortingParam)}
                    className={classNames(
                      option.sortingParam === currentSortingParam
                        ? "font-semibold text-sky-600"
                        : "text-gray-600",
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm w-full"
                    )}
                  >
                    {option.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
