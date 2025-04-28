import {mongo} from "../../db";

let productSchema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
    },
    category: {
        type: mongo.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"],
    },
    qty: {
        type: Number,
        required: true,
    }
})


export const ProductModel = mongo.model("Product", productSchema,)