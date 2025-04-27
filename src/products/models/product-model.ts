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
    category: {
        type: mongo.Schema.Types.ObjectId,
        ref: "categories",
        required: [true, "Category is required"],
    },

})


export const ProductModel = mongo.model("Product", productSchema,)