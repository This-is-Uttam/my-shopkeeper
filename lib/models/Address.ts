import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IAddress {
  clerkId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const addressSchema = new Schema<IAddress>(
  {
    clerkId: { type: String, required: true }, // user unique ID from Clerk

    fullName: { type: String, required: true },
    phone: { type: String, required: true },

    addressLine1: { type: String },
    addressLine2: { type: String, required: true },

    landmark: { type: String },

    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },

    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);
