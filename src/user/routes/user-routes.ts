import express from "express";
import {validatorMiddleware} from "../../common/middleware/validator-middleware";
import {changePasswordOtpValidator, sendOtpValidator} from "../validator/user-validator";
import {changePasswordOtp, sendOtp} from "../controller/user-controller";

const userRoutes = express.Router()

userRoutes.post("/sendOtp", validatorMiddleware(sendOtpValidator), sendOtp)
userRoutes.post("/changePasswordOtp", validatorMiddleware(changePasswordOtpValidator), changePasswordOtp)

export default userRoutes;