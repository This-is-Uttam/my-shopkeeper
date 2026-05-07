import { connectDB } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    //  Auth check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // connect to DB
    await connectDB();
    await User.findOneAndUpdate(
      { clerkId: userId,  },
      { $set: { cart: [] } },
      { new: true, upsert: true }
    );
    return NextResponse.json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.error("CART CLEAR ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
