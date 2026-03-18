import mongoose, { Schema, Document } from "mongoose";

type ImageType = {
  url: string;
  public_id: string;
};

export interface IProduct extends Document {
  name: string;
  slug: string;

  description: string;
  shortDescription: string;

  price: number;
  discountPrice?: number;
  currency: string;

  images: ImageType[];
  thumbnail: string;

  category: string;
  subCategory?: string;
  tags?: string[];

  stock: number;
  isActive: boolean;

  averageRating: number;
  totalReviews: number;

  brand?: string;
  sku?: string;

  isFeatured: boolean;

  createdBy: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    description: { type: String, required: true },
    shortDescription: { type: String, required: true },

    price: { type: Number, required: true },
    discountPrice: { type: Number },
    currency: { type: String, default: "INR" },

    images: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      required: true,
    },
    thumbnail: { type: String, required: true },

    category: { type: String, required: true },
    subCategory: { type: String },
    tags: { type: [String] },

    stock: { type: Number, required: true },
    isActive: { type: Boolean, default: true },

    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    brand: { type: String },
    sku: { type: String },

    isFeatured: { type: Boolean, default: false },

    createdBy: { type: String, required: true }, // admin userId
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
