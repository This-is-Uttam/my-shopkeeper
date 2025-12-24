import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import {
  IPopulatedCartItem,
  IUserWithPopulatedCart,
  User,
} from "@/lib/models/User";
import { Types } from "mongoose";

export interface ISyncCartItem {
  productId: string;
  quantity: number;
  priceAtThatTime: number;
}

export async function POST(req: Request) {
  try {
    //  Auth check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    //  Read request body
    const { items }: { items: ISyncCartItem[] } = await req.json();

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    //  Connect DB
    await connectDB();

    let dbCart: any;
    //  Normalize cart for DB
    if (items.length > 0) {
      dbCart = items.map((item) => ({
        productId: new Types.ObjectId(item.productId),
        quantity: item.quantity,
        priceAtThatTime: item.priceAtThatTime,
      }));
    } else {
      dbCart = [];
    }

    //  Update user's cart
    await User.findOneAndUpdate(
      { clerkId: userId },
      { $set: { cart: dbCart } },
      { new: true, upsert: true }
    );


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CART SYNC ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // check if user is logged in
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // connect to db
    await connectDB();

    const user = (await User.findOne({ clerkId: userId }).populate(
      "cart.productId"
    )) as IUserWithPopulatedCart | null;

    if (!user || !user.cart || user.cart.length === 0) {
      return NextResponse.json({ cart: [] }, { status: 200 });
    }

    // 4️⃣ Convert DB cart → frontend cart
    const cart = user.cart.map((item) => ({
      productId: item.productId._id.toString(),
      name: item.productId.name,
      price: item.productId.price,
      discountPrice: item.productId.discountPrice,
      image: item.productId.thumbnail,
      quantity: item.quantity,
      priceAtThatTime: item.priceAtThatTime,
    }));

    return NextResponse.json({ status: 200, cart }, { status: 200 });
  } catch (error) {
    console.error("Cart GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
