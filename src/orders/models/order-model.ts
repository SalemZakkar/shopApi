import {City} from "../../common/models/city-enum";
import {mongo} from "../../db";

let orderSchema = new mongo.Schema({
        note: String,
        user: {
            type: mongo.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        products: [
            {
                product: {
                    type: mongo.Schema.Types.ObjectId,
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


export const OrderModel = mongo.model("Order", orderSchema,)