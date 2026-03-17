import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { checkIfUserIsAdmin } from "@/utils/helper";

export async function GET() {
  try {
    // check if user is logged in and it is admin
    const isUserAdmin = await checkIfUserIsAdmin();

    if (!isUserAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const users = await User.find().sort({
      createdAt: -1, // latest  first
    });

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("GET users ERROR (ADMIN):", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch users (ADMIN)" },
      { status: 500 },
    );
  }
}
