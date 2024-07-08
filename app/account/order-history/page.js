import OrderedItem from "@/components/account/OrderedItem";
import { authOptions } from "@/lib/auth";
import { backend_secret_key } from "@/lib/constant";
import formatDate from "@/lib/formatDate";
import { getServerSession } from "next-auth";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function OrderHistory() {
  const session = await getServerSession(authOptions);

  async function getOrderHistory() {
    const res = await fetch(
      `${backendUrl}/api/orders/order-history/${session.user.username}/`,
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

  const orders = await getOrderHistory();

  return (
    <div className="w-full max-w-7xl px-4 md:px-5">
      <h2 className="font-manrope font-bold text-2xl sm:text-3xl leading-10 text-black text-center">
        Order History
      </h2>
      {orders?.length > 0 ? (
        <>
          {orders.map((order) => {
            const {
              id,
              first_name,
              last_name,
              email,
              address,
              postal_code,
              city,
              created,
              paid,
              status,
              total_amount,
            } = order;
            const orderedItems = order["items"];

            return (
              <div
                key={id}
                className="mt-8 w-full border border-gray-200 rounded-xl pt-6 max-w-3xl "
              >
                <div className=" px-6 pb-6 border-b border-gray-200">
                  <div className="flex flex-col gap-y-1 font-semibold text-black">
                    <p className="">
                      Order Id:{" "}
                      <span className="text-primary font-medium">#{id}</span>
                    </p>
                    <p className=" ">
                      Date of Order :{" "}
                      <span className="text-gray-400 font-medium">
                        {" "}
                        {formatDate(created)}
                      </span>
                    </p>
                    <p className="">
                      Status :{" "}
                      <span className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                        {" "}
                        Confirmed
                      </span>
                    </p>
                  </div>
                </div>
                {orderedItems?.map((item, index) => (
                  <div key={index}>
                    <OrderedItem item={item} />
                  </div>
                ))}

                <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                  <p className="font-semibold text-md text-black py-6">
                    Total Price:{" "}
                    <span className="text-primary"> ${total_amount}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>There are no order history</div>
      )}
    </div>
  );
}
