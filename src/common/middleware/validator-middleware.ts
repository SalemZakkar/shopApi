import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ErrorInput} from "../models/app-error";

export const validatorMiddleware = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try{
            let {error} = schema.validate(req.body, req.query)

            if (!error?.message) {
                next()
            } else {
                next(new ErrorInput(error.message, error.details,))
            }
        }catch (e){
            next(e)
        }
    }
};