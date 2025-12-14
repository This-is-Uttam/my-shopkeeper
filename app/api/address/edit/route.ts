import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Address } from "@/lib/models/Address";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    // check if user is logged in
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get the request
    const data = await request.json();

    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      pincode,
    } = data;

    // connect to db
    await connectDB();

    // check if user have already saved addresses
    const updatedAddress = await Address.findByIdAndUpdate(data._id, data, {
      updated: true,
    });

    //   Create new address in db

    return NextResponse.json(
      {
        status: 200,
        message: "Address updated successfully.",
        data: updatedAddress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Address EDIT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
