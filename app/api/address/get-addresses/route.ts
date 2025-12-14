import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Address } from "@/lib/models/Address";

export async function GET(request: Request) {
    try {
            // check if user is logged in
            const { userId } = await auth();
    
            if (!userId) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
    
            // get the request
            // const data = await request.json();

    
            // connect to db
            await connectDB();
    
            // check if user have already saved addresses
            const addresses = await Address.find({ clerkId: userId }).sort({ createdAt: -1 });;

            return NextResponse.json({status: 200, data: addresses}, {status: 200})
        } catch (error) {
        console.error("Address GET Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}