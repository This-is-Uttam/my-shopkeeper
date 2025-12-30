import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Order } from "@/lib/models/Orders";

export async function GET(request: Request) {
  try {
    // check if user is logged in
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // connect to db
    await connectDB();
    // Create new order in db
    const orders = await Order.find({
      userId,
    });

    console.log("All Orders Received:", orders);

    return NextResponse.json({ status: 201, data: orders }, { status: 201 });
  } catch (error) {
    console.error("Orders POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
