import express from "express";
import {AddOrder, DeleteOrder, ChangeOrderStatus, GetOrderById, GetOrders} from "../controller/orders-controller";
import {permissionMiddleware} from "../../auth/middleware/permission-middleware";
import {Action} from "../../auth/abilities/actions.enum";
import {Subject} from "../../auth/abilities/subject.enum";
import {validatorMiddleware} from "../../common/middleware/validator-middleware";
import {addOrderSchema, getOrderSchema, setOrderStatusSchema} from "../order-validator/order-validator";

let orderRoutes = express.Router();

orderRoutes.route("/").get(permissionMiddleware([Action.Read], Subject.Order,), validatorMiddleware(
    getOrderSchema
), GetOrders)
    .post(permissionMiddleware([Action.Create,], Subject.Order), validatorMiddleware(addOrderSchema), AddOrder)

orderRoutes.route("/:id").patch(permissionMiddleware([Action.Update], Subject.Order,), validatorMiddleware(setOrderStatusSchema), ChangeOrderStatus)
    .delete(permissionMiddleware([Action.Delete], Subject.Order,), DeleteOrder)
    .get(permissionMiddleware([Action.Read], Subject.Order,), GetOrderById)

export default orderRoutes;