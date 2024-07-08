"use client";

import { useState } from "react";
import AddressForm from "../common/AddressForm";
import OrderSummary from "./OrderSummary";

export default function PlaceOrder({ addresses, userId }) {
  const [selectedAddress, setSelectedAddress] = useState("new");

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

  // Event handler for when the select value changes
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);

    if (event.target.value == "new") {
      setFormData(initialState);
      return;
    }

    const sadd = addresses.find((obj) => obj.id == event.target.value);

    setFormData({
      ...formData,
      firstName: sadd.first_name,
      lastName: sadd.last_name,
      email: sadd.email,
      address: sadd.address,
      postalCode: sadd.postal_code,
      city: sadd.city,
    });
  };

  return (
    <div className="mt-12 flex flex-col lg:flex-row gap-x-8 gap-y-6 ">
      <div className="flex flex-col gap-y-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-slate-700 pl-3 border-l-4 border-l-primary">
          SHIPPING ADDRESS
        </h2>

        <div>
          {/* saved addresses */}
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Saved addresses
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              value={selectedAddress}
              onChange={handleAddressChange}
            >
              <option value="new">Use a new address</option>

              {addresses?.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.address}, {address.city}, {address.postal_code} (
                  {address.first_name} {address.last_name})
                </option>
              ))}
            </select>
          </div>

          {/* address form */}
          <div className="mt-6">
            <AddressForm
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-lg ">
        <OrderSummary userId={userId} formData={formData} />
      </div>
    </div>
  );
}
