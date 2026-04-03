import mongoose, { Schema, Document, Types } from "mongoose";
import { IProduct } from "./Products";


// DB cart item (stored in MongoDB)
export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
  priceAtThatTime: number;
}

// Populated cart item (after populate)
export interface IPopulatedCartItem {
  productId: IProduct;
  quantity: number;
  priceAtThatTime: number;
};


export interface IUser extends Document {
  fullName: string;
  clerkId: string;
  email: string;
  imageUrl?: string;
  phone?: string;
  role: string;
  cart: ICartItem[];
}

// Optional helper type (NOT a schema)
export interface IUserWithPopulatedCart extends Omit<IUser, "cart"> {
  cart: IPopulatedCartItem[];
}


const userSchema = new Schema<IUser>(
  {
    fullName: { type: String },
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    imageUrl: { type: String },
    phone: { type: String },
    role: {
      type: String, enum: ["USER", "ADMIN"], default: "USER",
    },

    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        priceAtThatTime: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);


export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
