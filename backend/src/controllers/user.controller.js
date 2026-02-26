import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      fullName,
      phone,
      password,
      role,
      address,
      tailorDetails,
      deliveryDetails
    } = req.body;

    // 1️⃣ Check required fields
    if (!username || !email || !fullName || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email or username"
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const user = await User.create({
      username,
      email,
      fullName,
      phone,
      password: hashedPassword,
      role,
      address,
      tailorDetails,
      deliveryDetails
    });

    // Remove password from response
    const createdUser = await User.findById(user._id)
      .select("-password -refreshToken");

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createdUser
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export {
    registerUser
}