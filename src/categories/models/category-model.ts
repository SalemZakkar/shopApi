import {mongo} from "../../db";

let categorySchema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
})



export const CategoryModel = mongo.model("Category", categorySchema,)