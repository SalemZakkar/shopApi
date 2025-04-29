import express from "express";
import {validatorMiddleware} from "../../common/middleware/validator-middleware";
import {changePasswordOtpValidator, sendOtpValidator} from "../validator/user-validator";
import {changePasswordOtp, getMine, getUsersByCriteria, sendOtp} from "../controller/user-controller";
import {permissionMiddleware} from "../../auth/middleware/permission-middleware";
import {Action} from "../../auth/abilities/actions.enum";
import {Subject} from "../../auth/abilities/subject.enum";

const userRoutes = express.Router()

userRoutes.post("/sendOtp", validatorMiddleware(sendOtpValidator), sendOtp)
userRoutes.post("/changePasswordOtp", validatorMiddleware(changePasswordOtpValidator), changePasswordOtp)
userRoutes.get("/getMine", permissionMiddleware([Action.Read], Subject.User), getMine)
userRoutes.get("/", permissionMiddleware([Action.Read], Subject.User), getUsersByCriteria)

export default userRoutes;