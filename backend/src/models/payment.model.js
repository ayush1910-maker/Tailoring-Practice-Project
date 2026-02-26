import mongoose from "mongoose";

const paymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    transactionId: String,

    amount: Number,

    method: {
      type: String,
      enum: ["COD", "ONLINE"]
    },

    status: {
      type: String,
      enum: ["success", "failed", "pending"]
    }
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);