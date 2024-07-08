"use client";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PriceFilter from "./PriceFilter";

export default function Filters({ occasions, recipients }) {
  const filterParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const allFilters = [
    {
      title: "FILTER BY OCCASION",
      filterName: "occasion",
      data: occasions,
    },
    {
      title: "FILTER BY RECIPIENT",
      filterName: "recipient",
      data: recipients,
    },
  ];

  let queryParams;

  function handleClick(checkbox) {
    queryParams = new URLSearchParams(filterParams);
    queryParams.set("page", "1");

    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      // Delete the filter from query
      queryParams.delete(checkbox.name);
    } else {
      // Set filter in the query
      if (queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value);
      } else {
        queryParams.append(checkbox.name, checkbox.value);
      }
    }

    replace(`${pathname}?${queryParams.toString()}`);
  }

  function clearFilters() {
    replace(pathname);
    const occasionCheckboxes = document.getElementsByName("occasion");

    occasionCheckboxes.forEach((item) => {
      item.checked = false;
    });

    const recipientCheckboxes = document.getElementsByName("recipient");

    recipientCheckboxes.forEach((item) => {
      item.checked = false;
    });
  }

  return (
    <div className="flex flex-col gap-y-4">
      <button
        onClick={clearFilters}
        type="button"
        className="px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
      >
        &times; Clear filters
      </button>

      <PriceFilter />
      {allFilters.map((filter) => {
        const { title, filterName, data } = filter;
        return (
          <Disclosure
            key={filterName}
            defaultOpen={true}
            as="div"
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">{title}</span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {data.map((d, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          name={filterName}
                          type="checkbox"
                          value={d.slug}
                          defaultChecked={
                            filterParams.get(filterName) === d.slug
                          }
                          onClick={(e) => handleClick(e.target)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-3 text-sm text-gray-600">
                          {d.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
}
