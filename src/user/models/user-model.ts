import * as mongoose from "mongoose";
import {City} from "../../common/models/city-enum";
import {Role} from "../../common/models/role-enum";

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        code: { type: String },
        phone: { type: String },
        _id: false,
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
        }
    }
})


export const UserModel = mongoose.model("User", userSchema,)