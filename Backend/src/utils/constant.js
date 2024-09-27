import { config } from "dotenv";

config();
export let port = process.env.PORT;
export let mongoDbUrl = process.env.MONGODBURL;
export let secretKey = process.env.SECRET_KEY;
export let email = process.env.EMAIL;
export let password = process.env.PASSWORD;
