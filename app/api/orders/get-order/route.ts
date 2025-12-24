import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Address } from "@/lib/models/Address";
import { auth } from "@clerk/nextjs/server";
import { Order } from "@/lib/models/Orders";
import { Schema } from "mongoose";

export async function POST(request: Request) {
  try {
    // check if user is logged in
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get the request
    const data = await request.json();

    // console.log("Orderid:", data);

    // connect to db
    await connectDB();
    // Create new order in db
    const orderData = await Order.findOne({
      _id: data.orderId,
      userId: userId,
    });

    console.log("Order Data Received:", orderData);

    return NextResponse.json({ status: 201, data: orderData }, { status: 201 });
  } catch (error) {
    console.error("Orders POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
