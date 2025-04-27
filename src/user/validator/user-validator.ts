import Joi from "joi";

export const sendOtpValidator = Joi.object(
    {
        email: Joi.string().email().required()
    }
)

export const changePasswordOtpValidator = Joi.object(
    {
        code: Joi.string().required().min(6).max(6),
        verificationId: Joi.string().required(),
        password: Joi.string().min(8).max(63).required(),
        confirmPassword: Joi.string().min(8).max(63).required(),
    }
)