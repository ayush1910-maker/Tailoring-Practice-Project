import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET);

    const user = await User.findById(decodedToken?._id || decodedToken?.id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    if (user.isBanned) {
      throw new ApiError(403, "Your account has been banned. Please contact support.");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
};

/**
 * Middleware to restrict access based on user roles
 * @param  {...string} roles - Array of allowed roles (admin, tailor, customer, delivery_partner)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Role: ${req.user.role} is not allowed to access this resource`
      );
    }
    next();
  };
};

export { verifyJWT, authorize };