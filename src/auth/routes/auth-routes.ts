import express from "express";
import {authSignIn, authSignUp} from "../controller/auth-controller";
import {validatorMiddleware} from "../../common/middleware/validator-middleware";
import {authSignInSchema, authSignUpSchema} from "../validator/auth.validator";

let authRoutes = express.Router()

authRoutes.post('/signUp', validatorMiddleware(authSignUpSchema), authSignUp)
authRoutes.post('/signIn' , validatorMiddleware(authSignInSchema) , authSignIn)

export default authRoutes;