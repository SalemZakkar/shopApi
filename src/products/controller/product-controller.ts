import {handler} from "../../common/utils/utils/handler";
import {ProductModel} from "../models/product-model";
import {sendSuccess} from "../../common/utils/utils/sendResponse";
import {ErrorInput, NotFoundError} from "../../common/models/app-error";
import {BaseApiGet} from "../../common/models/base-api-get";

export const addProduct = handler(async (req, res, next) => {
    let model = await (new ProductModel(req.body)).save()
    sendSuccess(res, {data: model})
})

export const deleteProduct = handler(async (req, res, next) => {
    const model = await ProductModel.findByIdAndDelete(req.params.id,)
    if (!model) {
        throw new ErrorInput()
    }
    sendSuccess(res,)
})

export const editProduct = handler(async (req, res, next) => {
    const model = await ProductModel.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
    if (!model) {
        throw new NotFoundError()
    }
    sendSuccess(res,{data: model})
})

export const getProductById = handler(async (req, res, next) => {
    const model = await ProductModel.findById(req.params.id,).populate("category")
    if (!model) {
        throw new ErrorInput()
    }
    sendSuccess(res, {data: model})
})

export const getProducts = handler(async (req, res, next) => {
    let model = new BaseApiGet(ProductModel.find(), req).paginate().filter()
    let count = await (new BaseApiGet(ProductModel.find(), req).filter()).query.countDocuments()
    let data = await model.query.clone().find()
    sendSuccess(res, {
        data: data,
        total: count,
    })
})