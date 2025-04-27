import {handler} from "../../common/utils/utils/handler";
import {BaseApiGet} from "../../common/models/base-api-get";
import {CategoryModel} from "../models/category-model";
import {sendSuccess} from "../../common/utils/utils/sendResponse";
import {NotFoundError} from "../../common/models/app-error";

export const addCategory = handler(async (req, res, next) => {
    let result = await (new CategoryModel(req.body).save())
    sendSuccess(res, {data: result,})
})

export const deleteCategory = handler(async (req, res, next) => {
    let result = await (CategoryModel.findByIdAndDelete(req.params.id,))
    if (!result) {
        throw new NotFoundError();
    }
    sendSuccess(res,)
})

export const editCategory = handler(async (req, res, next) => {
    let result = await (CategoryModel.findByIdAndUpdate(req.params.id, req.body,))
    if (!result) {
        throw new NotFoundError();
    }
    sendSuccess(res, {data: result,})
})

export const getCategories = handler(async (req, res, next) => {
    let api = new BaseApiGet(CategoryModel.find(), req).paginate();
    let data = await api.query.find();
    let totalRecords = await api.query.clone().countDocuments()
    sendSuccess(res, {data, totalRecords})
})

export const getCategoryById = handler(async (req, res, next) => {
    let result = await (CategoryModel.findById(req.params.id,))
    if (!result) {
        throw new NotFoundError();
    }
    sendSuccess(res,{data: result})
})