import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Products";

export async function POST(request: Request) {
  try {

    // get the request
    const data = await request.json();
    const slug = data.slug;

    // // 1️⃣ Connect to MongoDB
    await connectDB();

    // // 2️⃣ Fetch all products
    const product = await Product.findOne({ slug })

    // 3️⃣ Return response
    return NextResponse.json(
      { status: 200, product },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
