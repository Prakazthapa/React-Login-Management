import expressAsyncHandler from "express-async-handler";
import { webUser } from "../schema/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { email, password, secretKey } from "../utils/constant.js";
import { sendEmail } from "../utils/sendMail.js";

export const createWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let result1 = await webUser.create({
      ...req.body,
      isVerifiedEmail: false,
      password: hashPassword,
    });

    //generate token
    let token = jwt.sign({ _id: result1._id }, secretKey, { expiresIn: "5d" });

    //sent mail

    await sendEmail({
      from: "'Prakash Thapa'<prakasambhav24@gmail.com>",
      to: result1.email,
      subject: "Account Creation",
      html: `
        <h1>User account created successfully</h1>
        <a href="http://localhost:5173/verify-email?token=${token}">http://localhost:5173/verify-email?token=${token}</a>
      `,
      //the above link is the link of the frontend
    });
    res.status(201).json({
      success: true,
      message: "web user created successfully",
      result: result1,
    });
  }
);
export const verifyEmailController = expressAsyncHandler(
  async (req, res, next) => {
    let tokenStr = req.headers.authorization.split(" ")[1];
    let result1 = await webUser.findByIdAndUpdate(
      jwt.verify(tokenStr, secretKey)._id,
      { isVerifiedEmail: true },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "web user verified successfully",
      result: result1,
    });
  }
);
export const loginController = expressAsyncHandler(async (req, res, next) => {
  let user = await webUser.findOne({ email: req.body.email });
  if (user) {
    if (user.isVerifiedEmail) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.status(200).json({
          success: true,
          message: "User login successfully",
          result: user,
          token: await jwt.sign({ _id: user._id }, secretKey, {
            expiresIn: "365d",
          }),
        });
      } else {
        throw new Error("Credentials does not match");
      }
    } else {
      throw new Error("Credentials does not match");
    }
  } else {
    throw new Error("Credentials does not match");
  }
});
export const myProfileController = expressAsyncHandler(
  async (req, res, next) => {
    let result2 = await webUser.find({ _id: req._id });
    res.status(200).json({
      success: true,
      message: "Your Profile read successfully",
      result: result2,
    });
  }
);
export const updateProfileController = expressAsyncHandler(
  async (req, res, next) => {
    delete req.body.email; //email passed from postman is deleted so that email must be unchanged
    delete req.body.password; //same as above but in password
    let result2 = await webUser.findByIdAndUpdate(req._id, req.body, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "Your Profile updated successfully",
      result: result2,
    });
  }
);
export const updatePasswordController = expressAsyncHandler(
  async (req, res, next) => {
    let data = await webUser.findOne({ _id: req._id });
    let verifiedPass = await bcrypt.compare(
      req.body.oldPassword,
      data.password
    );
    if (verifiedPass) {
      let hashNewPassword = await bcrypt.hash(req.body.newPassword, 10);
      let result2 = await webUser.findByIdAndUpdate(
        req._id,
        { password: hashNewPassword },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Your Profile updated successfully",
        result: result2,
      });
    } else {
      throw new Error("Credential does not match");
    }
  }
);
export const forgotPasswordController = expressAsyncHandler(
  async (req, res, next) => {
    let data = await webUser.findOne({ email: req.body.email });
    if (data) {
      let token = await jwt.sign({ _id: data._id }, secretKey, {
        expiresIn: "5d",
      });
      await sendEmail({
        from: "'Prakash Thapa'<prakasambhav24@gmail.com>",
        to: req.body.email,
        subject: "Reset Password",
        html: `
        <h1>Please click given link to reset your password</h1>
          <a href="http://localhost:5173/reset-password?token=${token}">http://localhost:5173/reset-password?token=${token}</a>
        `,
      });
      res.status(200).json({
        success: true,
        message: "Link has been sent to your email to reset your password.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Email does not exist",
      });
    }
  }
);
export const resetPasswordController = expressAsyncHandler(
  async (req, res, next) => {
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let result1 = await webUser.findByIdAndUpdate(
      req._id,
      { password: hashPassword },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "password reset successfully",
      result: result1,
    });
  }
);
export const readAllWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result2 = await webUser.find({});
    res.status(200).json({
      success: true,
      message: "web user read successfully",
      result: result2,
    });
  }
);
export const readSpecificWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result1 = await webUser.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "specific web user read successfully",
      result: result1,
    });
  }
);
export const updateWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    // console.log(req._id);
    let result1 = await webUser.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "web user update successfully",
      result: result1,
    });
  }
);
export const deleteWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await webUser.findById(req.params.id);
    if (result.role === "superadmin") {
      res.status(400).json({
        success: false,
        message: "You can't delete yourself",
      });
    } else {
      let result1 = await webUser.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "web user deleted successfully",
        result: result1,
      });
    }
  }
);
