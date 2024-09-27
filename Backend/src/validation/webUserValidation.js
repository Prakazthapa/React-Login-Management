import Joi from "joi";
let webUserValidation = Joi.object()
  .keys({
    fullName: Joi.string()
      .required()
      .min(3)
      .max(15)
      .messages({
        "any.required": "fullName field is required",
        "string.base": "fullName field must be string",
        "string.min": "fullName must be at least 3 characters long",
        "string.max": "fullName must be at most 15 characters long",
      })
      .allow(""),
    email: Joi.string()
      .required()
      .custom((value, msg) => {
        let validEmail = value.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
        );
        if (validEmail) {
          return true;
        } else {
          return msg.message("Invalid Email");
        }
      })
      .messages({
        "any.required": "email field is required",
        "string.base": "email field must be string",
      }),
    password: Joi.string()
      .required()
      .custom((value, msg) => {
        let validPassword = value.match(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
        );
        if (validPassword) {
          return true;
        } else {
          return msg.message("Invalid Password");
        }
      })
      .messages({
        "any.required": "password field is required",
        "string.base": "password field must be string",
      }),
    phoneNumber: Joi.number()
      .required()
      .custom((value, msg) => {
        let strValue = String(value);
        let validPhoneNumber = strValue.match(
          /^(98\d{8}|97\d{8}|96\d{8}|0\d{1,2}\d{6,7})$/
        );
        if (validPhoneNumber) {
          return true;
        } else {
          return msg.message("Invalid PhoneNumber");
        }
      })
      .messages({
        "any.required": "phoneNumber field is required",
        "number.base": "phoneNumber must be Number",
      }),
    dob: Joi.string()
      .required()
      .custom((value, msg) => {
        let validDob = value.match(
          /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
        );
        if (validDob) {
          return true;
        } else {
          return msg.message("Invalid dob");
        }
      })
      .messages({
        "any.required": "dob field is required",
        "string.base": "dob field must be string",
      }),
    gender: Joi.string().required().valid("male", "female", "other").messages({
      "any.required": "gender field is required",
      "any.only": "gender must be 'male','female' or 'other'",
      "string.base": "gender field must be string",
    }),
    role: Joi.string()
      .required()
      .valid("superadmin", "admin", "customer")
      .messages({
        "any.required": "role field is required",
        "any.only": "role must be 'superadmin', 'admin','customer'",
        "string.base": "role field must be string",
      }),
    isVerifiedEmail: Joi.boolean().messages({
      "any.required": "isVerifiedEmail field is required",
      "boolean.base": "isVerifiedEmail field must be boolean",
    }),
  })
  .unknown(true);
export default webUserValidation;
