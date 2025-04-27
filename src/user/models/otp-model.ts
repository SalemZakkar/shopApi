import {mongo} from "../../db";

const otpSchema = new mongo.Schema(
    {
        code: {
            type: String,
            default: () => {
                let code = Math.floor(Math.random() * 1000000)
                return code.toString().padStart(6, '0')
            }
        },
        expireAt: {
            type: Date,
            default: () => new Date(Date.now() + 10 * 60 * 1000)
        },
        user: {
            type: mongo.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        }
    }
)

export const OtpModel = mongo.model('otp', otpSchema,)