import { User } from "@/src/utils/types/indext";
import mongoose, { Schema, model } from "mongoose";
// ==================================================================
// Define the PropertyDocument interface that includes timestamps
interface UserDocument {
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteSchema = new Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true }, // Must match the registered model name
  addedAt: { type: Date, default: Date.now },
});


const UserSchema = new Schema<User>(
  {
    cognitoSub: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    userName: { type: String, unique: true },
    phoneNumber: { type: String, default: "" },
    location: { type: String, default: "" },
    address: { type: String, default: "" },
    age: { type: Number, default: "" },
    gender: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    profile: { type: [String], default: [] },
    background: { type: [String], default: [] },
    favorite: { type: [FavoriteSchema] },
    role: { type: String, default: "user" },
  },

  { timestamps: true },
);

// Add a pre-save middleware to adjust timestamps
UserSchema.pre<UserDocument>("save", function (next) {
  const timezoneOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  // Adjust createdAt and updatedAt fields
  this.createdAt = new Date(this.createdAt.getTime() + timezoneOffset);
  this.updatedAt = new Date(this.updatedAt.getTime() + timezoneOffset);
  next();
});

export const UserModel = model<User>("user", UserSchema);
