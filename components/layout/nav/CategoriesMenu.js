/* eslint-disable react/no-unescaped-entities */
"use client";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi2";

export default function CategoriesMenu({ categories, occasions, recipients }) {
  const sections = [
    {
      id: "categories",
      title: "Gifts By Categories",
      linkPrefix: "/shop/",
      data: categories,
    },
    {
      id: "occasions",
      title: "Gifts By Occasion",
      linkPrefix: "/shop?occasion=",
      data: occasions,
    },
    {
      id: "recipients",
      title: "Gifts By Recipient",
      linkPrefix: "/shop?recipient=",
      data: recipients,
    },
  ];

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
        Categories
        <HiChevronDown
          className="-mr-1 ml-2 h-5 w-5 text-black"
          aria-hidden="true"
        />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-0 z-50 mt-5 flex w-screen max-w-3xl">
          <div className="py-4 overflow-y-auto flex-auto bg-white text-sm leading-6 rounded-md shadow-lg ring-1 ring-gray-900/5">
            <div className="mx-4 grid grid-cols-3 gap-x-12">
              {sections.map((section, index) => {
                return (
                  <div key={index}>
                    {section.data.length > 0 && (
                      <div className="">
                        <h1 className="text-gray-800 text-md font-bold">
                          {section.title}
                        </h1>
                        {section.data.map((d) => (
                          <Popover.Button
                            as={Link}
                            href={section.linkPrefix + d.slug}
                            className="flex gap-x-4 hover:opacity-90 py-4"
                            key={d.id}
                          >
                            <div className=" flex h-11 w-11 flex-none items-center justify-center rounded-lg ">
                              <Image
                                src={
                                  d.image
                                    ? `${normalizeImageUrl(d.image)}`
                                    : "/no-image.jpg"
                                }
                                width={50}
                                height={50}
                                alt="category image"
                              />
                            </div>

                            <span className="my-auto font-medium text-gray-700 hover:text-primary">
                              {d.name}
                            </span>
                          </Popover.Button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
