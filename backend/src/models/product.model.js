import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: String,

    price: {
      type: Number,
      required: true
    },

    discountPrice: Number,

    category: {
      type: String, // men, women, kids
      required: true
    },

    sizes: [
      {
        size: String,   // S, M, L, XL
        stock: Number
      }
    ],

    images: [String],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);