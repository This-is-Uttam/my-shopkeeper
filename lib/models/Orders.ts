import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  image: string;
  quantity: number;
  priceAtThatTime: number;
}

export interface IOrder extends Document {
  userId: string; // clerkId
  items: IOrderItem[];
  address: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
  };
  totalAmount: number;
  paymentMethod: "COD" | "ONLINE";
  orderStatus: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  orderedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },

    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        name: String,
        image: String,
        quantity: Number,
        priceAtThatTime: Number,
      },
    ],

    address: {
      fullName: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      landmark: String,
      city: String,
      state: String,
      pincode: String,
    },

    totalAmount: Number,
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },
    orderStatus: {
      type: String,
      enum: ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED",
    },
    orderedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
