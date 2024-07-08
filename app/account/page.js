import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>You are not logged in</div>;
  }
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-0.5">
        <span className="text-slate-600 font-medium">Email Address</span>
        <span>{session.user.email}</span>
      </div>
      <div className="flex flex-col gap-y-0.5">
        <span className="text-slate-600 font-medium">Username</span>
        <span>{session.user.username}</span>
      </div>
    </div>
  );
}
