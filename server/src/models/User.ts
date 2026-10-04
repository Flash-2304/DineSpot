import mongoose, { Document, Schema } from "mongoose";

export type UserRole = "customer" | "owner" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "owner", "admin"], default: "customer" },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
