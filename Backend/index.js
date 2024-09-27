import express, { json } from "express";
import connectToMongoDb from "./src/connecttoDb/connectToMongoDb.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import webUserRouter from "./src/router/webUserRouter.js";
import notFoundError from "./src/middleware/notFoundError.js";
import { port } from "./src/utils/constant.js";
import cors from "cors";
let expressApp = new express();

expressApp.use(json());
expressApp.use(cors());

expressApp.listen(port, () => {
  console.log(`Server is running at port number ${port}`);
  connectToMongoDb();
});
expressApp.use("/", webUserRouter);
expressApp.use(errorMiddleware);
expressApp.use("*", notFoundError);
