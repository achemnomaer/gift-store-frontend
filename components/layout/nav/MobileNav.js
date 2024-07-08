"use client";

import Logo from "@/components/common/Logo";
import { useNavContext } from "@/context/NavContext";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment } from "react";
import { CiHeart, CiTimer, CiUser } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa6";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

// components

import classNames from "classnames";
import Categories from "./Categories";
import Search from "./Search";

export default function MobileNav({
  categories,
  occasions,
  recipients,
  session,
}) {
  const { open, setOpen } = useNavContext();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex justify-between px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link
                    onClick={() => setOpen(false)}
                    href="/"
                    className="flex items-center"
                  >
                    <Logo />
                  </Link>
                </div>
              </div>

              {/* Search bar */}
              <div className="my-6 mx-1 md:hidden">
                <Search />
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8 px-4">
                    {["Categories", "Menu"].map((item, index) => (
                      <Tab
                        key={index}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "border-primary text-primary"
                              : "border-transparent text-gray-900",
                            "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                          )
                        }
                      >
                        {item}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel className="space-y-10  pb-8 ">
                    <Categories
                      categories={categories}
                      occasions={occasions}
                      recipients={recipients}
                    />
                  </Tab.Panel>

                  <Tab.Panel className="space-y-10 px-4 pb-8 pt-4">
                    <div className="mx-5 flex flex-col gap-y-8">
                      <Link
                        onClick={() => setOpen(false)}
                        href="/cart"
                        className="-m-2 flex gap-x-4 p-2 font-medium hover:bg-gray-100"
                      >
                        <span>
                          <ShoppingBagIcon className="w-6 h-6 text-slate-500" />
                        </span>
                        <span className="text-slate-900">Cart</span>
                      </Link>

                      <Link
                        onClick={() => setOpen(false)}
                        href="/wishlist"
                        className="-m-2 flex gap-x-4 p-2  font-medium  hover:bg-gray-100"
                      >
                        <span>
                          <CiHeart className="w-6 h-6 text-slate-500" />
                        </span>
                        <span>Wishlist</span>
                      </Link>

                      {session ? (
                        <>
                          <Link
                            onClick={() => setOpen(false)}
                            href="/account/order-history"
                            className="-m-2 flex gap-x-4 p-2 font-medium hover:bg-gray-100"
                          >
                            <span>
                              <CiTimer className="w-6 h-6 text-slate-500" />
                            </span>
                            <span className="text-slate-900">
                              Order History
                            </span>
                          </Link>
                          <Link
                            onClick={() => setOpen(false)}
                            href="/account"
                            className="-m-2 flex gap-x-4 p-2 font-medium hover:bg-gray-100"
                          >
                            <span>
                              <CiUser className="w-6 h-6 text-slate-500" />
                            </span>
                            <span className="text-slate-900">Account</span>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            onClick={() => setOpen(false)}
                            href="/sign-in"
                            className="-m-2 flex gap-x-4 p-2 font-medium text-slate-600  hover:bg-gray-100"
                          >
                            <span>
                              <HiArrowRightOnRectangle className="w-6 h-6 text-slate-500" />
                            </span>
                            <span className="text-slate-900">Sign in</span>
                          </Link>

                          <Link
                            onClick={() => setOpen(false)}
                            href="/sign-up"
                            className="-m-2 flex gap-x-4 p-2 font-medium  hover:bg-gray-100"
                          >
                            <span>
                              <FaUserPlus className="w-7 h-7 text-slate-500" />
                            </span>
                            <span className="text-slate-900">
                              Create account
                            </span>
                          </Link>
                        </>
                      )}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
