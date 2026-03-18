import { connectDB } from "@/lib/db";
import { IProduct, Product } from "@/lib/models/Products";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(request: Request) {
    try {
    // check if user is logged in
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get the request
    const products = await request.json();
    const { ids } = products;

    // connect to db
    await connectDB();

    // check if user have already saved addresses
    const allProducts: IProduct[] = await Product.find({_id: {$in: ids}});
    const publicIds: string[] = []

    allProducts.forEach( (product) => {
      product.images.forEach((img) => {
        img.public_id && publicIds.push(img.public_id);
      })
    }
    );

    // delete images from cloudinary
    await cloudinary.api.delete_resources(publicIds);
      
    // delete products from db
    const deletedProducts = await Product.deleteMany({_id: {$in: ids}});


    return NextResponse.json(
      {
        status: 200,
        message: "ProductS deleted successfully.",
        data: deletedProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Product DELETE Error (ADMIN):", error);
    return NextResponse.json(
      { error: "Internal Server Error (ADMIN)" },
      { status: 500 }
    );
  }
}