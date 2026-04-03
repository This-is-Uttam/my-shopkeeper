import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { checkIfUserIsAdmin } from "@/utils/helper";
import { useAuth } from "@clerk/nextjs";

export async function POST(request: Request) {
  try {

    const isUserAdmin = await checkIfUserIsAdmin();

    if (!isUserAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    

    // get the request
    const data = await request.json();
    const { userId: targetUser } = data;

    await connectDB();

    const userData = await User.findOne({clerkId: targetUser});

    return NextResponse.json({ success: true, userData }, { status: 200 });
  } catch (error) {
    console.error("GET users ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
