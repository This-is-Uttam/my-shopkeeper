import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Products";
import { checkIfUserIsAdmin } from "@/utils/helper";

export async function GET() {
  try {
    // check if user is logged in and it is admin
    const isUserAdmin = await checkIfUserIsAdmin();

    if (!isUserAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const products = await Product.find().sort({
      createdAt: -1, // latest product first
    });

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error("GET PRODUCTS ERROR (ADMIN):", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch products (ADMIN)" },
      { status: 500 },
    );
  }
}
