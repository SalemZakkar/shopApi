import Joi from "joi";

export const categoryInputSchema = Joi.object({
    name: Joi.string().required(),
})
