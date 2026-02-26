import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    phone: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: [true, "Password is required"]
    },

    role: {
      type: String,
      enum: ["admin", "customer", "tailor", "delivery_partner"],
      required: true,
      default: "customer"
    },

    address: {
      type: String,
      required: function () {
        return this.role === "customer";
      }
    },

    tailorDetails: {
      experience: {
        type: Number 
      },
      specialization: {
        type: [String] 
      },
      shopAddress: String,
      isAvailable: {
        type: Boolean,
        default: true
      }
    },

    // Delivery Partner specific details
    deliveryDetails: {
      vehicleType: {
        type: String // bike, scooty, etc.
      },
      licenseNumber: String,
      isActive: {
        type: Boolean,
        default: true
      }
    },

    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model("User", userSchema);