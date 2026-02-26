import mongoose, { Schema } from "mongoose";

const measurementSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String, // kurti, suit, blouse etc.
      required: true
    },

    measurements: {
      chest: Number,
      waist: Number,
      hip: Number,
      length: Number,
      shoulder: Number,
      sleeve: Number
    }
  },
  { timestamps: true }
);

export const Measurement = mongoose.model("Measurement", measurementSchema);