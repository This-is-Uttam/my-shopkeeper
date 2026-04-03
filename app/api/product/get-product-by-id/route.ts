import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Products";
import { checkIfUserIsAdmin } from "@/utils/helper";

export async function POST(request: Request) {
  try {
       // check if user is logged in and it is admin
     const isUserAdmin = await checkIfUserIsAdmin();
 
     if (!isUserAdmin) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
 
    // get the request
    const { productId } = await request.json();

    // // 1️⃣ Connect to MongoDB
    await connectDB();

    // // 2️⃣ Fetch all products
    const product = await Product.findOne({ _id: productId });

    // 3️⃣ Return response
    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch product" },
      { status: 500 },
    );
  }
}
