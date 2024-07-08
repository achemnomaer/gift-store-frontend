"use client";
import { backend_secret_key } from "@/lib/constant";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import AddressForm from "../common/AddressForm";
import Spinner from "../common/Spinner";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AddNewAddresses({ userId }) {
  const [formOpen, setFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function addAddress() {
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
      const response = await fetch(`${backendUrl}/api/orders/add-address/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Frontend-Secret-Key": backend_secret_key,
        },
        body: JSON.stringify(addressData),
      });

      if (response.ok) {
        setFormData(initialState);
        toast.success("Address added successfully!");
        setIsLoading(false);
        setFormOpen(false);
      } else {
        toast.error("Something is going wrong!");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something is going wrong!");
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={() => setFormOpen(true)}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br bg-primary group-hover:bg-primary-hover  hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          + Add a new address
        </span>
      </button>

      <Transition
        show={formOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="mt-6"
      >
        <h2 className=" font-semibold text-lg">ADD A NEW ADDRESS</h2>
        <div className="mt-4">
          <AddressForm
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />{" "}
        </div>

        <div className="flex gap-x-2 w-full justify-between mt-4 max-w-lg">
          {/* Button to save the address */}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => addAddress(formData)}
            className="flex w-full justify-center text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2"
          >
            {isLoading ? <Spinner md /> : "Save"}
          </button>

          {/* Cancel button to hide the address form */}
          <button
            type="button"
            onClick={() => setFormOpen(false)}
            className=" w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2"
          >
            Cancel
          </button>
        </div>
      </Transition>
    </div>
  );
}
