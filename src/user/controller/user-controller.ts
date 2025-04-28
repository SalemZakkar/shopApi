import {handler} from "../../common/utils/utils/handler";
import {UserModel} from "../models/user-model";
import {ErrorInput} from "../../common/models/app-error";
import {OtpModel} from "../models/otp-model";
import {sendSuccess} from "../../common/utils/utils/sendResponse";
import {hash} from "bcrypt";


export const sendOtp = handler(async (req, res, next) => {
    let model = await UserModel.findOne({email: req.body.email})
    if (!model) {
        throw new ErrorInput("Email Not Found");
    }
    let result = await (new OtpModel({user: model.id}).save())
    sendSuccess(res, {verificationId: result.id,})
})

export const changePasswordOtp = handler(async (req, res, next) => {
    if (req.body.password != req.body.confirmPassword) {
        throw new ErrorInput("Password and confirmPassword mismatch")
    }
    let result = await OtpModel.findOne({_id: req.body.verificationId, code: req.body.code})
    if (!result) {
        throw new ErrorInput("Wrong Otp")
    }
    await UserModel.findByIdAndUpdate(result.user, {$set: {password: await hash(req.body.password, 10)}})
    await OtpModel.findByIdAndDelete(req.body.verificationId)
    sendSuccess(res, {message: "Change Password Successfully"})
})

export const getMine = handler(async (req: any, res, next) => {
    sendSuccess(res, {data: req.user})
})