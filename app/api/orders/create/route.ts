import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Address } from "@/lib/models/Address";
import { auth } from "@clerk/nextjs/server";
import { Order } from "@/lib/models/Orders";

export async function POST(request: Request) {
  try {
    // check if user is logged in
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get the request
    const data = await request.json();


    console.log("Order raw Data Received:", data.address.fullName, data.address.addressLine1, data.address.addressLine2);

    // connect to db
    await connectDB();
    // Create new order in db
    const order = await Order.create({
      userId,
      items: data.items,
      address: {
        fullName: data.address.fullName,
        phone: data.address.phone,
        addressLine1: data.address.addressLine1,
        addressLine2: data.address.addressLine2,
        landmark: data.address.landmark,
        city: data.address.city,
        state: data.address.state,
        pincode: data.address.pincode,
      },
      totalAmount: data.totalAmount,
      paymentMethod: data.paymentMethod,
      orderStatus: "PLACED",
    });
    console.log("Order paths: ",Object.keys(Order.schema.paths));

    console.log("Order Data Received:", order);

    return NextResponse.json(
      { status: 201, message: "Order placed successfully", orderId: order._id },
      { status: 201 }
    );
    // return NextResponse.json(
    //   { status: 201, message: "Order placed successfully", data },
    //   { status: 201 }
    // );
  } catch (error) {
    console.error("Orders POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
