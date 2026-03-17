import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Order } from "@/lib/models/Orders";
import { checkIfUserIsAdmin } from "@/utils/helper";

export async function GET(request: Request) {
  try {
    // check if user is logged in and it is admin
    const isUserAdmin = await checkIfUserIsAdmin();

    if (!isUserAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // connect to db
    await connectDB();
    // Create new order in db
    const orders = await Order.find().sort({createdAt: -1});

    console.log("All Orders Received:", orders);

    return NextResponse.json({ status: 201, data: orders }, { status: 201 });
  } catch (error) {
    console.error("Orders POST Error (ADMIN):", error);
    return NextResponse.json(
      { error: "Internal Server Error (ADMIN)" },
      { status: 500 }
    );
  }
}
