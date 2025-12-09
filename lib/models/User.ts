import { model } from "mongoose";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: String,
    clerkId: String,
    email: String,
    imageUrl: String,
    phone: String,
    isSignedIn: Boolean
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);