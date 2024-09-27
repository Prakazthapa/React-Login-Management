import mongoose from "mongoose";
import { mongoDbUrl } from "../utils/constant.js";

let connectToMongoDb = () => {
  mongoose.connect(mongoDbUrl);
  console.log("connected to the mongoDB database successfully");
};
export default connectToMongoDb;
