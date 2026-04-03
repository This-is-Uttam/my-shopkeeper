import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Order } from "@/lib/models/Orders";
import { checkIfUserIsAdmin } from "@/utils/helper";

export async function POST(request: Request) {
  try {
    // check if user is logged in and it is admin
     const isUserAdmin = await checkIfUserIsAdmin();
 
     if (!isUserAdmin) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
 
    // get the request
    const data = await request.json();

    // console.log("Orderid:", data);

    // connect to db
    await connectDB();
    // Create new order in db
    const orderData = await Order.findOne({
      _id: data.orderId
    });

    console.log("Order Data Received:", orderData);

    return NextResponse.json({ success: true, data: orderData }, { status: 201 });
  } catch (error) {
    console.error("Orders POST Error (ADMIN):", error);
    return NextResponse.json(
      { error: "Internal Server Error (ADMIN)" },
      { status: 500 }
    );
  }
}
