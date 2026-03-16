import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Products";
import { auth } from "@clerk/nextjs/server";
import { create } from "domain";

export async function POST(request: Request) {
  try {
    //  Auth check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get the request
    const data = await request.json();
    console.log("REQUEST BODY:", data);

    // Connect to MongoDB
    await connectDB();

    // Fetch all products
    const product = await Product.insertOne({ 
      name: data.name,
      slug: data.slug,
      description: data.description,
      shortDescription: data.shortDescription,
      price: data.price,
      discountPrice: data.discountPrice,
      currency: data.currency,
      images: data.images,
      thumbnail: data.thumbnail,
      category: data.category,
      subCategory: data.subCategory,
      tags: data.tags,
      stock: data.stock,
      brand: data.brand,
      isFeatured: data.isFeatured,
      createdBy: userId
     });

    // Return response
    return NextResponse.json({ status: 201, "message": "Product added successfully" }, { status: 200 });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
