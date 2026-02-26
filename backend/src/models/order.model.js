import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      index: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    orderType: {
      type: String,
      enum: ["custom", "readymade"],
      required: true
    },

    // Readymade items
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: Number,
        size: String,
        price: Number
      }
    ],

    // Custom stitching fields
    serviceCategory: String, // e.g., "Kurti", "Suit"
    deliveryType: {
      type: String,
      enum: ["NORMAL", "EXPRESS", "PREMIUM"],
      default: "NORMAL"
    },
    fabricPickupRequired: {
      type: Boolean,
      default: true
    },
    designReference: {
      type: String // URL to uploaded design image
    },
    measurements: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Measurement"
    },
    additionalInstructions: String,

    // Assignment
    tailor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    status: {
      type: String,
      enum: [
        "ORDER_PLACED",
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
      ],
      default: "ORDER_PLACED"
    },

    totalAmount: {
      type: Number,
      required: true,
      min: [999, "Minimum order value is ₹999 for custom orders"]
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING"
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,

    pickupAddress: String,
    deliveryAddress: {
      type: String,
      required: true
    },

    // Logging & Timeline
    fabricPickedAt: Date,
    deliveredAt: Date,
    cancellationReason: String,
    payoutProcessed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Pre-save hook to generate order number
orderSchema.pre("save", function(next) {
  if (!this.orderNumber) {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const random = Math.floor(1000 + Math.random() * 9000);
    this.orderNumber = `ORD-${date}-${random}`;
  }
  next();
});

export const Order = mongoose.model("Order", orderSchema);