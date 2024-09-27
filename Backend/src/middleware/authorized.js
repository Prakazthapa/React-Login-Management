import { webUser } from "../schema/model.js";

const authorized = (roles) => {
  return async (req, res, next) => {
    let UserRole = (await webUser.findById(req._id)).role;
    if (roles.includes(UserRole)) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }
  };
};
export default authorized;
