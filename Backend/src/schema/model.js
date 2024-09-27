import mongoose, { model } from "mongoose";
import webUserSchema from "./webUserSchema.js";

export let webUser = model("webUser", webUserSchema);
