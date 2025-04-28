import express from "express";
import {addProduct, deleteProduct, editProduct, getProductById, getProducts} from "../controller/product-controller";
import {authMiddleware} from "../../auth/middleware/auth-middleware";
import {permissionMiddleware} from "../../auth/middleware/permission-middleware";
import {Subject} from "../../auth/abilities/subject.enum";
import {Action} from "../../auth/abilities/actions.enum";
import {validatorMiddleware} from "../../common/middleware/validator-middleware";
import {addProductSchema, editProductSchema, getProductSchema} from "../validator/product-validator";

let productRoutes = express.Router()

productRoutes.route("/").get(validatorMiddleware(getProductSchema), getProducts).all(
    validatorMiddleware(addProductSchema), permissionMiddleware([Action.Create], Subject.Product)).post(
    addProduct,
)

productRoutes.route("/:id").get(getProductById)
    .delete(permissionMiddleware([Action.Delete], Subject.Product), deleteProduct)
    .patch(validatorMiddleware(editProductSchema), permissionMiddleware([Action.Update], Subject.Product), editProduct)

export default productRoutes;