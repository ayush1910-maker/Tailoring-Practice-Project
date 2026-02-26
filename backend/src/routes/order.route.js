import express from "express";
import { 
    createOrder, 
    getOrderById, 
    updateOrderStatus, 
    getMyOrders 
} from "../controllers/order.controller.js";
import { verifyJWT, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/", authorize("customer"), createOrder);
router.get("/", getMyOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);

export default router;
