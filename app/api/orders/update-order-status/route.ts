import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Order } from "@/lib/models/Orders";
import { checkIfUserIsAdmin } from "@/utils/helper";

export async function POST(request: Request) {
  try {
    // check if user is logged in and it is admin
    const isUserAdmin = await checkIfUserIsAdmin();

    if (!isUserAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId, newStatus } = await request.json();

    // connect to db
    await connectDB();
    // update a order in db
    const orders = await Order.findOneAndUpdate({ _id: orderId }, { orderStatus: newStatus }, { update: true });

    return NextResponse.json({ success: true, data: orders, message: `Order Status Updated to ${newStatus}` }, { status: 201 });
  } catch (error) {
    console.error("Orders POST Error (ADMIN):", error);
    return NextResponse.json(
      { error: "Internal Server Error (ADMIN)" },
      { status: 500 }
    );
  }
}
