import mongoose from "mongoose";

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
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
          type: Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: Number,
        size: String
      }
    ],

    // Custom stitching fields
    fabricPickupRequired: Boolean,
    measurement: {
      type: Schema.Types.ObjectId,
      ref: "Measurement"
    },

    tailor: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    deliveryPartner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    status: {
      type: String,
      enum: [
        "placed",
        "fabric_picked",
        "assigned_to_tailor",
        "stitching_in_progress",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled"
      ],
      default: "placed"
    },

    totalAmount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);