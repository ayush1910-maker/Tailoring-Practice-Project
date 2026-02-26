import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from "./routes/user.route.js"
import orderRouter from "./routes/order.route.js"
import adminRouter from "./routes/admin.route.js"

// routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/admin", adminRouter)

// Error handling middleware
import { ApiError } from "./utils/ApiError.js"

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors
        })
    }
    
    // Default error
    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

export { app }