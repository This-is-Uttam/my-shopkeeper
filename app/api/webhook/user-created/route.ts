import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) throw new Error("Webhook secret missing from ENV");

    const payload = await req.text(); // 👈 IMPORTANT
    const headerPayload = headers();

    const svix_id = (await headerPayload).get("svix-id");
    const svix_timestamp = (await headerPayload).get("svix-timestamp");
    const svix_signature = (await headerPayload).get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json(
        { error: "Missing svix headers" },
        { status: 400 }
      );
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: any;

    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid signature!" },
        { status: 400 }
      );
    }

    console.log(`Succeed: evg.data: ${evt.data.data}`);
    console.log(`Succeed: evg.data first: ${evt.data.first_name}`);
    await connectDB();

    const { id, email_addresses, first_name, last_name, profile_image_url, phone_numbers } =
      evt.data;
    const email = email_addresses?.[0]?.email_address;
    const fullName = `${first_name ?? ""} ${last_name ?? ""}`.trim();


    const existing = await User.findOne({ clerkId: id });
    if (!existing) {
      await User.create({
        fullName,
        clerkId: id,
        email,
        imageUrl: profile_image_url,
        phone: phone_numbers[0],
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Webhook error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
