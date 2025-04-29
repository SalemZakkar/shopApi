import {City} from "../../common/models/city-enum";
import {mongo} from "../../db";
import {OrderStatus} from "./order-enum"

let orderSchema = new mongo.Schema({
        note: String,
        user: {
            type: mongo.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        products: {
            type: [
                {
                    product: {
                        type: mongo.Schema.Types.ObjectId,
                        ref: "Product",
                        required: true
                    },
                    quantity: Number,
                }
            ],
            _id: false
        },
        city: {
            type: String,
            required: true,
            enum: Object.values(City)
        },
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.PENDING
        },
        total: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    })


export const OrderModel = mongo.model("Order", orderSchema,)