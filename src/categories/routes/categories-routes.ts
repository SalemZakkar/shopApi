import express from "express";
import {
    addCategory,
    deleteCategory,
    editCategory,
    getCategories,
    getCategoryById
} from "../controller/category-controller";


import {validatorMiddleware} from "../../common/middleware/validator-middleware";
import {categoryInputSchema} from "../validator/category-validator";
import {permissionMiddleware} from "../../auth/middleware/permission-middleware";
import {Subject} from "../../auth/abilities/subject.enum";
import {Action} from "../../auth/abilities/actions.enum";


let categoriesRoutes = express.Router()

categoriesRoutes.route("/",).get(getCategories)
    .all(permissionMiddleware([Action.Manage], Subject.Category))
    .post(validatorMiddleware(categoryInputSchema), addCategory)

categoriesRoutes.route("/:id")
    .get(getCategoryById)
    .all(permissionMiddleware([Action.Manage], Subject.Category))
    .put(validatorMiddleware(categoryInputSchema), editCategory)
    .delete(deleteCategory)

export default categoriesRoutes;