import Joi from "joi";
import {mongoNumberSchema} from "../../common/validators/number-query-schema";

export const addOrderSchema = Joi.object(
    {
        note: Joi.string(),
        city: Joi.string().required(),
        user: Joi.string(),
        products: Joi.array().items(
            Joi.object({
                product: Joi.string().required(),
                qty: Joi.number().required(),
            })
        ).required(),
    }
).unknown(false)


export const setOrderStatusSchema = Joi.object(
    {
        status: Joi.string().required(),
    }
).unknown(false)

export const getOrderSchema = Joi.object(
    {
        status: Joi.string(),
        total: mongoNumberSchema(),
        user: Joi.string(),
        skip: Joi.number(),
        limit: Joi.number(),
    }
).unknown(false)