import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Order } from "@/lib/models/Orders";

export async function POST(request: Request) {
  try {
    // check if user is logged in
    const { userId } = await auth();

     if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get request body
    const reqData = await request.json();
    console.log("Request Data:", reqData);
    const { orderId } = reqData;

    // connect to db
    await connectDB();
    // Create new order in db
    const orderDetail = await Order.findOne({
      userId,
      _id: orderId,
    });


    return NextResponse.json({ status: 201, data: orderDetail }, { status: 201 });
  } catch (error) {
    console.error("Order Detail POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}