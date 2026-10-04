import mongoose, { Document, Schema } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  slug: string;
  description: string;
  cuisine: string[];
  address: string;
  city: string;
  image?: string;
  owner: mongoose.Types.ObjectId;
  isApproved: boolean;
  capacity: number;
  openingTime: string;
  closingTime: string;
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    cuisine: [{ type: String }],
    address: { type: String, required: true },
    city: { type: String, required: true },
    image: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isApproved: { type: Boolean, default: false },
    capacity: { type: Number, default: 20 },
    openingTime: { type: String, default: "10:00" },
    closingTime: { type: String, default: "22:00" },
  },
  { timestamps: true }
);

export default mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
