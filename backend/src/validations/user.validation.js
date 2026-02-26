import Joi from "joi";

const registerUserSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.alphanum": "Username must contain only letters and numbers"
    }),

  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required"
    }),

  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*]{6,30}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 6-30 characters long and contain at least one letter and one number",
      "string.empty": "Password is required"
    }),

  fullName: Joi.string()
    .min(3)
    .max(50)
    .trim()
    .required()
    .messages({
      "string.empty": "Full name is required"
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be a valid 10 digit number",
      "string.empty": "Phone number is required"
    }),

  role: Joi.string()
    .valid("admin", "customer", "tailor", "delivery_partner")
    .default("customer"),

  address: Joi.when("role", {
    is: "customer",
    then: Joi.string().trim().required().messages({
      "any.required": "Address is required for customers"
    }),
    otherwise: Joi.string().trim().optional()
  }),

  // 🔹 Tailor specific fields
  experience: Joi.when("role", {
    is: "tailor",
    then: Joi.number().min(0).required().messages({
      "any.required": "Experience is required for tailor"
    }),
    otherwise: Joi.number().optional()
  }),

  specialization: Joi.when("role", {
    is: "tailor",
    then: Joi.array().items(Joi.string().trim()).min(1).required().messages({
      "any.required": "Specialization is required for tailor"
    }),
    otherwise: Joi.array().optional()
  }),

  shopAddress: Joi.when("role", {
    is: "tailor",
    then: Joi.string().trim().required().messages({
      "any.required": "Shop address is required for tailor"
    }),
    otherwise: Joi.string().optional()
  }),

  // 🔹 Delivery partner specific fields
  vehicleType: Joi.when("role", {
    is: "delivery_partner",
    then: Joi.string().trim().required().messages({
      "any.required": "Vehicle type is required for delivery partner"
    }),
    otherwise: Joi.string().optional()
  }),

  licenseNumber: Joi.when("role", {
    is: "delivery_partner",
    then: Joi.string().trim().required().messages({
      "any.required": "License number is required for delivery partner"
    }),
    otherwise: Joi.string().optional()
  })
})
.options({ abortEarly: false, allowUnknown: false });

const loginUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().required()
});

const updateTailorStatusSchema = Joi.object({
  isAvailable: Joi.boolean(),
  specialization: Joi.array().items(Joi.string())
});

export {
  registerUserSchema,
  loginUserSchema,
  updateTailorStatusSchema
};
