import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import Sidebar from "@/components/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1 Check Clerk auth
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // 2 Connect DB
  await connectDB();

  // 3 Fetch user from DB
  const user = await User.findOne({ clerkId: userId });

  // 4 Role check
  if (!user || user.role !== "ADMIN") {
    redirect("/"); // or /unauthorized
    // console.log("User: ", user);
  }

  // 5 Allow access
  return (
    <div className="min-h-screen flex">
      {/* Admin Sidebar */}
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
