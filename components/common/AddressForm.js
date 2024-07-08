"use client";

import Input from "./Input";

export default function AddressForm({ formData, setFormData, handleChange }) {
  return (
    <form className="flex flex-col gap-y-4 w-full max-w-lg">
      <div className="flex gap-x-3">
        {/* First name and Last name input field */}
        <Input
          type="text"
          id="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          id="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email inpur field */}
      <Input
        type="email"
        id="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Address input field */}
      <div className="">
        <label
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
          htmlFor="address"
        >
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          placeholder="Enter your full address"
          rows="3"
          required
        />
      </div>
      {/* Postal code input field */}
      <Input
        type="text"
        id="postalCode"
        label="Postal Code"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />

      {/* City input field */}
      <Input
        type="text"
        id="city"
        label="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
    </form>
  );
}
