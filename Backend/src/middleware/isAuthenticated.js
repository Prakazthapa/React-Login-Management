import jwt from "jsonwebtoken";
import { secretKey } from "../utils/constant.js";
let isAuthenticated = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let verifyToken = await jwt.verify(token, secretKey);
  if (verifyToken) {
    req._id = verifyToken._id;
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "token not valid",
    });
  }
};
export default isAuthenticated;
