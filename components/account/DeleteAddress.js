"use client";

import { backend_secret_key } from "@/lib/constant";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function DeleteAddress({ addressId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteAddress() {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${backendUrl}/api/orders/delete-address/${addressId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Frontend-Secret-Key": backend_secret_key, // Add your secret key here
          },
        }
      );

      if (response.ok) {
        toast.success("Address deleted successfully");
        setIsLoading(false);
        setIsOpen(false);
      } else {
        toast.error("Something is going wrong!");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      toast.error("Something is going wrong!");
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-red-600 hover:text-red-800"
      >
        Delete
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-semibold">
                    Are you sure?
                  </Dialog.Title>

                  <div className="flex gap-x-2 w-full justify-between mt-8">
                    {/* Button to update the address */}
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={deleteAddress}
                      className="flex w-full justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      {isLoading ? <Spinner md /> : "Delete"}
                    </button>

                    {/* Cancel button to hide the address form */}
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-white bg-black hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
