import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IUser {
  fullName: string;
  clerkId: String;
  email: String;
  imageUrl: String;
  phone: String;
  isSignedIn: Boolean;
}

const userSchema = new Schema<IUser>(
  {
    fullName: String,
    clerkId: String,
    email: String,
    imageUrl: String,
    phone: String,
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
