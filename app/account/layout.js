import AccountNav from "@/components/account/AccountNav";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AccountLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <section className="mt-12 flex flex-col gap-y-8 md:flex-row md:gap-x-4">
      <header className="md:pr-4 md:border-r md:border-r-slate-200 w-full max-w-[280px]">
        <div className="flex flex-col gap-y-4 p-4">
          <h1 className="pl-4 text-lg text-slate-800 font-bold pb-3 border-b border-b-slate-200">
            MY ACCOUNT
          </h1>
          <AccountNav />
        </div>
      </header>

      <div className="w-full">{children}</div>
    </section>
  );
}
