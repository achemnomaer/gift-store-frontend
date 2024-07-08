"use client";

import { backend_secret_key } from "@/lib/constant";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import AddressForm from "../common/AddressForm";
import Spinner from "../common/Spinner";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function EditAddress({ address, userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: address.first_name,
    lastName: address.last_name,
    email: address.email,
    address: address.address,
    postalCode: address.postal_code,
    city: address.city,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function updateAddress() {
    setIsLoading(true);

    const addressData = {
      user: userId,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      address: formData.address,
      postal_code: formData.postalCode,
      city: formData.city,
    };

    try {
      const response = await fetch(
        `${backendUrl}/api/orders/edit-address/${address.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Frontend-Secret-Key": backend_secret_key,
          },
          body: JSON.stringify(addressData),
        }
      );

      if (!response.ok) {
        toast.error("Something is going wrong!");
        setIsLoading(false);
        return;
      }

      toast.success("Address updated successfully!");
      setIsLoading(false);
      setIsOpen(false);
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
        className="hover:text-slate-700"
      >
        Edit
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
                    Edit Address
                  </Dialog.Title>
                  <div className="mt-6">
                    <AddressForm
                      formData={formData}
                      setFormData={setFormData}
                      handleChange={handleChange}
                    />
                  </div>

                  <div className="flex gap-x-2 w-full justify-between mt-4">
                    {/* Button to update the address */}
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={updateAddress}
                      className="flex w-full justify-center text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      {isLoading ? <Spinner md /> : "Update"}
                    </button>

                    {/* Cancel button to hide the address form */}
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2"
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
