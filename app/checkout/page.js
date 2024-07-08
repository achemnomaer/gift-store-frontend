import PlaceOrder from "@/components/checkout/PlaceOrder";
import { authOptions } from "@/lib/auth";
import { backend_secret_key } from "@/lib/constant";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function Checkout() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

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
      <PlaceOrder addresses={addresses} userId={user.pk} />
    </div>
  );
}
