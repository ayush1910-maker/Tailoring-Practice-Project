import express from "express";
import { 
    verifyTailor, 
    assignOrder, 
    getPlatformStats 
} from "../controllers/admin.controller.js";
import { verifyJWT, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);
router.use(authorize("admin"));

router.patch("/verify-tailor", verifyTailor);
router.patch("/orders/assign", assignOrder);
router.get("/stats", getPlatformStats);

export default router;
