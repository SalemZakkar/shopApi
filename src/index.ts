import express from "express";

let app = express();
import * as cors from "cors";
import {config} from "dotenv";
import qs from "qs";
import {errorHandlerMiddleWare} from "./common/middleware/errorMiddleware";
import authRoutes from "./auth/routes/auth-routes";
import {authMiddleware} from "./auth/middleware/auth-middleware";
import categoriesRoutes from "./categories/routes/categories-routes";
import userRoutes from "./user/routes/user-routes";
import productsRoutes from "./products/routes/products-routes";
import orderRoutes from "./orders/routes/order-routes";

config()

app.set('query parser', (str: string) => qs.parse(str));

app.use(authMiddleware())

app.use(cors.default())

app.use(express.json())

app.use("/api/auth", authRoutes)

app.use("/api/categories", categoriesRoutes)

app.use("/api/users", userRoutes)

app.use("/api/product", productsRoutes)

app.use("/api/order", orderRoutes)

app.use(errorHandlerMiddleWare)

export default app;