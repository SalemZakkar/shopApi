import Joi from "joi";
import {mongoNumberSchema} from "../../common/validators/number-query-schema";

export const addProductSchema = Joi.object(
    {
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        qty: Joi.number().required()
    }
).unknown(false)

export const editProductSchema = Joi.object(
    {
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        category: Joi.string(),
        qty: Joi.number().optional(),
    },
).unknown(false)

export const getProductSchema = Joi.object(
    {
        skip: Joi.number().optional(),
        limit: Joi.number().optional(),
        price: mongoNumberSchema(),
        qty: mongoNumberSchema(),
        category: Joi.string().optional(),
    }
).unknown(false)