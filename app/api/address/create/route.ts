import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Address } from "@/lib/models/Address";
import { auth } from "@clerk/nextjs/server";

// Note: Delete API is also in this page

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
        const existingAddresses = await Address.find({ clerkId: userId });

        let defaultAddress = false;

        console.log("Existing Addresses: ", existingAddresses.length);
        if (existingAddresses.length == 0) 
          defaultAddress = true;

        //   Create new address in db

        const newAddress = await Address.create({
            clerkId: userId,
            fullName,
            phone,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            pincode,
            isDefault: defaultAddress,
        });

        return NextResponse.json(
            {status: 201, message: "Address added successfully", address: newAddress },
            { status: 201 }
        );
    } catch (error) {
        console.error("Address POST Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request) {
    try {
    // check if user is logged in
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get the request
    const data = await request.json();
    const _id = data._id;

    // connect to db
    await connectDB();

    // check if user have already saved addresses
    const deletedAddress = await Address.findOneAndDelete({_id});


    return NextResponse.json(
      {
        status: 200,
        message: "Address deleted successfully.",
        data: deletedAddress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Address DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}