import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ===========================
   Tailor SubSchema
=========================== */
const tailorSchema = new Schema(
  {
    experience: {
      type: Number,
      required: true
    },
    specialization: {
      type: [String],
      required: true
    },
    shopAddress: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    documents: {
      aadhar: String,
      pan: String,
      shopLicense: String,
      policeVerification: String
    },
    portfolio: {
      type: [String],
      default: []
    },
    commissionRate: {
      type: Number,
      default: 15
    },
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      bankName: String,
      accountHolderName: String
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    ratings: {
      type: Number,
      default: 0
    },
    totalOrdersCompleted: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

/* ===========================
   Delivery SubSchema
=========================== */
const deliverySchema = new Schema(
  {
    vehicleType: {
      type: String,
      required: true
    },
    licenseNumber: {
      type: String,
      required: true
    },
    documents: {
      aadhar: String,
      license: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    currentLocation: {
      lat: Number,
      lng: Number
    },
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      bankName: String
    }
  },
  { _id: false }
);

/* ===========================
   Main User Schema
=========================== */
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["admin", "customer", "tailor", "delivery_partner"],
      default: "customer"
    },

    address: {
      type: String,
      required: function () {
        return this.role === "customer";
      }
    },

    isBanned: {
      type: Boolean,
      default: false
    },

    tailorDetails: {
      type: tailorSchema,
      default: undefined
    },

    deliveryDetails: {
      type: deliverySchema,
      default: undefined
    },

    refreshToken: {
      type: String,
      select: false
    }
  },
  { timestamps: true }
);

/* ===========================
   Password Hashing
=========================== */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* ===========================
   Instance Methods
=========================== */

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);