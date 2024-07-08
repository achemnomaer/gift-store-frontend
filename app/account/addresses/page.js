import AddNewAddresses from "@/components/account/AddNewAddress";
import DeleteAddress from "@/components/account/DeleteAddress";
import EditAddress from "@/components/account/EditAddress";
import { authOptions } from "@/lib/auth";
import { backend_secret_key } from "@/lib/constant";
import { getServerSession } from "next-auth";
import { toast } from "react-toastify";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function Addresses() {
  const session = await getServerSession(authOptions);

  let user;
  let addresses = [];
  async function getAddress() {
    const res = await fetch(
      `${backendUrl}/api/orders/get-address/${user.username}/`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Frontend-Secret-Key": backend_secret_key,
        },
      }
    );

    if (!res.ok) {
      toast.error("Failed to fetch addresses!");
    }

    return res.json();
  }

  if (session) {
    user = session.user;
    addresses = await getAddress();
  }

  return (
    <div>
      <div>
        <AddNewAddresses userId={user.pk} />
      </div>

      <div className="mt-8 flex flex-col gap-y-4">
        {addresses?.map((address) => (
          <div
            key={address.id}
            className="block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow"
          >
            <div className="flex flex-row justify-between gap-x-8">
              <h5 className="mb-2  font-semibold tracking-tight text-gray-900">
                {address.first_name} {address.last_name}
              </h5>
              <div className="flex my-auto text-sm font-semibold gap-x-4">
                <EditAddress address={address} userId={user.pk} />
                <DeleteAddress addressId={address.id} />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-700 ">
              {address.address}, {address.city}, {address.postal_code}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
