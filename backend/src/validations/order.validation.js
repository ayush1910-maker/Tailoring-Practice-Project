import Joi from "joi";

const createOrderSchema = Joi.object({
  orderType: Joi.string().valid("custom", "readymade").required(),
  
  // Custom stitching fields
  serviceCategory: Joi.string().when("orderType", { is: "custom", then: Joi.required() }),
  deliveryType: Joi.string().valid("NORMAL", "EXPRESS", "PREMIUM").default("NORMAL"),
  fabricPickupRequired: Joi.boolean().default(true),
  measurements: Joi.string().when("orderType", { is: "custom", then: Joi.required(), otherwise: Joi.forbidden() }),
  designReference: Joi.string().uri().optional(),
  additionalInstructions: Joi.string().max(500).optional(),
  
  // Readymade products
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      size: Joi.string().required(),
      price: Joi.number().required()
    })
  ).when("orderType", { is: "readymade", then: Joi.array().min(1).required() }),

  totalAmount: Joi.number().min(999).required().messages({
    'number.min': 'Minimum order value is ₹999 for custom stitching orders'
  }),
  
  paymentMethod: Joi.string().valid("COD", "ONLINE").required().when("orderType", {
    is: "custom",
    then: Joi.valid("ONLINE").messages({ 'any.only': 'Custom stitching requires Online Payment' })
  }),
  
  deliveryAddress: Joi.string().required(),
  pickupAddress: Joi.string().when("fabricPickupRequired", { is: true, then: Joi.required() })
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid(
    "PICKUP_ASSIGNED",
    "PICKUP_IN_PROGRESS",
    "FABRIC_PICKED",
    "TAILOR_ASSIGNED",
    "WITH_TAILOR",
    "CUTTING",
    "STITCHING",
    "HEMMING",
    "IRONING",
    "READY_FOR_DISPATCH",
    "DELIVERY_ASSIGNED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
    "ALTERATION_REQUESTED"
  ).required(),
  cancellationReason: Joi.string().when("status", { is: "CANCELLED", then: Joi.required() })
});

export {
  createOrderSchema,
  updateOrderStatusSchema
};
