import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Products";

export async function GET() {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();

    // 2️⃣ Fetch all products
    const products = await Product.find({ isActive: true }).sort({
      createdAt: -1, // latest product first
    });

    // 3️⃣ Return response
    return NextResponse.json(
      { success: true, products },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
