import { Schema } from "mongoose";

let webUserSchema = Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
    },
    isVerifiedEmail: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
export default webUserSchema;
