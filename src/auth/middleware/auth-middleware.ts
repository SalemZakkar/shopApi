import * as expressJwt from "express-jwt"
import {UserModel} from "../../user/models/user-model";

export const authMiddleware = () => {
    return expressJwt.expressjwt({
        secret: process.env.JWT_SECRET!,
        algorithms: ["HS256"],
        isRevoked: async (request , payload) => {

            (request as any).user = await UserModel.findById((payload!.payload as any).id);
            return payload == null;
        },
    },).unless({
        path: [
            {url: "/api/auth/signIn", methods: ["POST"]},
            {url: "/api/auth/signUp", methods: ["POST"]},
            {url: "/api/users/sendOtp", methods: ["POST"]},
            {url: "/api/users/changePasswordOtp", methods: ["POST"]},
            {url: /^(\/api\/product)(.*)/, methods: ["GET"]},
            {url: /^(\/api\/category)(.*)/, methods: ["GET"]},
        ]
    })
}
