"use client";

import { HiBars3CenterLeft } from "react-icons/hi2";

// context
import { useNavContext } from "@/context/NavContext";

export default function MenuOpenButton() {
  const { setOpen } = useNavContext();
  return (
    <button
      type="button"
      className="relative rounded-md bg-white p-2"
      onClick={() => setOpen(true)}
    >
      <span className="absolute -inset-0.5" />
      <span className="sr-only">Open menu</span>
      <HiBars3CenterLeft
        className="h-7 w-7 text-gray-700 hover:text-gray-800"
        aria-hidden="true"
      />
    </button>
  );
}
