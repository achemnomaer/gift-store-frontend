import Logout from "@/components/common/Logout";
import { authOptions } from "@/lib/auth";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const navLinks = [
  {
    name: "Dashboard",
    href: "/account",
  },
  {
    name: "Order History",
    href: "/account/order-history",
  },
  {
    name: "Manage Addresses",
    href: "/account/addresses",
  },
  {
    name: "Wishlist",
    href: "/wishlist",
  },
];

export default async function AccountIcon() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <Link href="/sign-in" className="flex my-auto ml-4 lg:ml-6">
        <Avatar size="sm" alt="avatar" rounded />
      </Link>
    );
  }

  const { user } = session;

  return (
    <div className="flex my-auto ml-4 lg:ml-6">
      <Dropdown
        arrowIcon={false}
        inline
        label={<Avatar size="sm" alt="avatar" rounded />}
      >
        <DropdownHeader>
          <span className="block text-sm">{user.username}</span>
          <span className="block truncate text-sm font-medium">
            {user.email}
          </span>
        </DropdownHeader>
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            <DropdownItem>{link.name}</DropdownItem>
          </Link>
        ))}

        <DropdownDivider />
        <div>
          <Logout type="dropdown" />
        </div>
      </Dropdown>
    </div>
  );
}
