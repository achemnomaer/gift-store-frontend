"use client";
import { DropdownItem } from "flowbite-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Logout({ type }) {
  const router = useRouter();

  const handleSignOut = async () => {
    toast.success("Logged out successfully!");
    await signOut();

    await router.refresh();
  };

  if (type === "normal") {
    return (
      <button
        className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        type="button"
        onClick={handleSignOut}
      >
        Log out
      </button>
    );
  }

  return <DropdownItem onClick={handleSignOut}>Log out</DropdownItem>;
}
