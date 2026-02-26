import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyTailor = asyncHandler(async (req, res) => {
    const { tailorId, isVerified, commissionRate } = req.body;

    const tailor = await User.findOne({ _id: tailorId, role: "tailor" });

    if (!tailor) {
        throw new ApiError(404, "Tailor not found");
    }

    tailor.tailorDetails.isVerified = isVerified;
    if (commissionRate) tailor.tailorDetails.commissionRate = commissionRate;

    await tailor.save();

    return res.status(200).json(
        new ApiResponse(200, tailor, `Tailor ${isVerified ? "verified" : "unverified"} successfully`)
    );
});

const assignOrder = asyncHandler(async (req, res) => {
    const { orderId, tailorId, deliveryPartnerId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    if (tailorId) {
        const tailor = await User.findOne({ _id: tailorId, role: "tailor" });
        if (!tailor || !tailor.tailorDetails.isVerified) {
            throw new ApiError(400, "Invalid or unverified tailor");
        }
        order.tailor = tailorId;
        order.status = "TAILOR_ASSIGNED";
    }

    if (deliveryPartnerId) {
        const dp = await User.findOne({ _id: deliveryPartnerId, role: "delivery_partner" });
        if (!dp) {
            throw new ApiError(400, "Invalid delivery partner");
        }
        order.deliveryPartner = deliveryPartnerId;
        if (!tailorId) order.status = "PICKUP_ASSIGNED";
    }

    await order.save();

    return res.status(200).json(
        new ApiResponse(200, order, "Order assigned successfully")
    );
});

const getPlatformStats = asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "ORDER_PLACED" });
    const totalRevenue = await Order.aggregate([
        { $match: { paymentStatus: "PAID" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const stats = {
        totalOrders,
        pendingOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalCustomers: await User.countDocuments({ role: "customer" }),
        totalTailors: await User.countDocuments({ role: "tailor" })
    };

    return res.status(200).json(
        new ApiResponse(200, stats, "Platform statistics fetched successfully")
    );
});

export {
    verifyTailor,
    assignOrder,
    getPlatformStats
};
