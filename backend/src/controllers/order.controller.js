import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createOrderSchema, updateOrderStatusSchema } from "../validations/order.validation.js";

const createOrder = asyncHandler(async (req, res) => {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) {
        throw new ApiError(400, error.details[0].message);
    }

    const { 
        orderType, 
        totalAmount, 
        paymentMethod, 
        serviceCategory, 
        measurements, 
        deliveryAddress,
        pickupAddress,
        products,
        deliveryType
    } = value;

    // Business Rule Check: Minimum Order for Custom
    if (orderType === "custom" && totalAmount < 999) {
        throw new ApiError(400, "Minimum order value for custom stitching is ₹999");
    }

    // Business Rule Check: Payment Method
    if (orderType === "custom" && paymentMethod !== "ONLINE") {
        throw new ApiError(400, "Custom stitching orders only accept Online Payments");
    }

    const order = await Order.create({
        customer: req.user._id,
        orderType,
        totalAmount,
        paymentMethod,
        serviceCategory,
        measurements: orderType === "custom" ? measurements : undefined,
        products: orderType === "readymade" ? products : [],
        deliveryAddress,
        pickupAddress,
        deliveryType,
        status: "ORDER_PLACED"
    });

    return res.status(201).json(
        new ApiResponse(201, order, "Order placed successfully")
    );
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate("customer", "fullName phone email")
        .populate("tailor", "fullName tailorDetails")
        .populate("deliveryPartner", "fullName phone")
        .populate("measurements");

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    // Security check: Only involved parties or admin can see the order
    const isAuthorized = 
        req.user.role === "admin" || 
        order.customer.toString() === req.user._id.toString() ||
        (order.tailor && order.tailor.toString() === req.user._id.toString()) ||
        (order.deliveryPartner && order.deliveryPartner.toString() === req.user._id.toString());

    if (!isAuthorized) {
        throw new ApiError(403, "You are not authorized to view this order");
    }

    return res.status(200).json(
        new ApiResponse(200, order, "Order fetched successfully")
    );
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { error, value } = updateOrderStatusSchema.validate(req.body);
    if (error) {
        throw new ApiError(400, error.details[0].message);
    }

    const { status, cancellationReason } = value;
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    // Business Rule: Cancellation check
    if (status === "CANCELLED") {
        if (order.status !== "ORDER_PLACED" && order.status !== "PICKUP_ASSIGNED") {
            throw new ApiError(400, "Order cannot be cancelled after the fabric pickup has started");
        }
    }

    // Role-based status update logic
    if (req.user.role === "tailor") {
        const allowedTailorStatuses = ["CUTTING", "STITCHING", "HEMMING", "IRONING", "READY_FOR_DISPATCH"];
        if (!allowedTailorStatuses.includes(status)) {
            throw new ApiError(403, "Tailors can only update stitching-related statuses");
        }
        if (order.tailor.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "You are not the assigned tailor for this order");
        }
    }

    if (req.user.role === "delivery_partner") {
        const allowedDeliveryStatuses = ["PICKUP_IN_PROGRESS", "FABRIC_PICKED", "OUT_FOR_DELIVERY", "DELIVERED"];
        if (!allowedDeliveryStatuses.includes(status)) {
            throw new ApiError(403, "Delivery partners can only update logistics-related statuses");
        }
        if (order.deliveryPartner.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "You are not the assigned delivery partner for this order");
        }
    }

    order.status = status;
    if (status === "CANCELLED") order.cancellationReason = cancellationReason;
    if (status === "FABRIC_PICKED") order.fabricPickedAt = new Date();
    if (status === "DELIVERED") order.deliveredAt = new Date();

    await order.save();

    return res.status(200).json(
        new ApiResponse(200, order, `Order status updated to ${status}`)
    );
});

const getMyOrders = asyncHandler(async (req, res) => {
    let query = {};
    if (req.user.role === "customer") query.customer = req.user._id;
    if (req.user.role === "tailor") query.tailor = req.user._id;
    if (req.user.role === "delivery_partner") query.deliveryPartner = req.user._id;
    
    // Admin sees all by default unless filtered (logic can be expanded)
    if (req.user.role === "admin") query = {};

    const orders = await Order.find(query).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, orders, "Orders fetched successfully")
    );
});

export {
    createOrder,
    getOrderById,
    updateOrderStatus,
    getMyOrders
};
