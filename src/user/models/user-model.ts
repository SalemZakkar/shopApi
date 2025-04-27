import {City} from "../../common/models/city-enum";
import {Role} from "../../common/models/role-enum";
import {mongo} from "../../db";
import {extractPhone} from "../../common/utils/utils/string/string-utils";
import validator from "validator";

let userSchema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        validate: [
            function (value: any) {
                return validator.isMobilePhone(value , 'any' , {strictMode: true})
            },
            "Please Enter a valid phone",
        ]
    },
    password: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
        enum: Object.values(City),
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.User,
    }
}, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.password;
            ret.phone = extractPhone(ret.phone)
        }
    }
})

export const UserModel = mongo.model("User", userSchema,)