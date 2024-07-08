import Logo from "@/components/common/Logo";

import { getCategories, getOccasions, getRecipients } from "@/lib/data/getData";

import NavContextProvider from "@/context/NavContext";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import AccountIcon from "./AccountIcon";
import CartIcon from "./CartIcon";
import CategoriesMenu from "./CategoriesMenu";
import MenuOpenButton from "./MenuOpenButton";
import MobileNav from "./MobileNav";
import Search from "./Search";
import WishlistIcon from "./WishlistIcon";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  const categories = await getCategories();
  const occasions = await getOccasions();
  const recipients = await getRecipients();

  return (
    <NavContextProvider>
      <div className="bg-white">
        {/* Mobile menu */}
        <MobileNav
          categories={categories}
          occasions={occasions}
          recipients={recipients}
          session={session}
        />

        {/* Header */}
        <header className="relative ">
          <nav aria-label="Top">
            <div className="border-b border-gray-200">
              <div className="flex justify-between items-center h-16">
                {/* Categories menu */}
                <div className="flex my-auto lg:hidden">
                  <MenuOpenButton />
                </div>

                <div className="hidden my-auto lg:flex">
                  <CategoriesMenu
                    categories={categories}
                    occasions={occasions}
                    recipients={recipients}
                  />
                </div>

                {/* Logo */}
                <div className="ml-4 flex">
                  <Link href="/" className="flex items-center">
                    <Logo />
                  </Link>
                </div>

                {/* Search */}
                <div className="hidden md:block w-full max-w-sm ml-auto">
                  <Search />
                </div>

                <div className="ml-auto flex items-center">
                  {!session && (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link
                        href="/sign-in"
                        className="text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        Sign in
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link
                        href="/sign-up"
                        className="text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        Create account
                      </Link>
                    </div>
                  )}

                  {/* Wishlist */}
                  <WishlistIcon />

                  {/* Cart */}
                  <CartIcon />

                  {/* User Account */}
                  <AccountIcon />
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </NavContextProvider>
  );
}
