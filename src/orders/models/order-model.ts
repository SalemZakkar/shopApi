import * as mongoose from "mongoose";
import {City} from "../../common/models/city-enum";

let orderSchema = new mongoose.Schema({
        note: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: [true, "User is required"],
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                quantity: Number,
            }
        ],
        city: {
            type: String,
            required: true,
            enum: Object.values(City)
        }
    },
    {
        timestamps: true,
    })


export const OrderModel = mongoose.model("Order", orderSchema,)