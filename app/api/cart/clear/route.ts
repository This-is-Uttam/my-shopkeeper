import { connectDB } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    //  Auth check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //  Clear cart in DB
    //  (We don't need to read request body as we are just clearing the cart)
    //  Here, connectDB is a function that connects to your MongoDB database
    await connectDB();
    //  Update user's cart to be empty
    const { User } = await import("@/lib/models/User");
    await User.findOneAndUpdate(
      { clerkId: userId },
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
