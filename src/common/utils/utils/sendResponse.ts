import {Response} from "express";

type Params = {
    code?: number,
    message?: string,
    errors?: any,
    data?: any,
    total?: number,
    [key: string]: any,
}

export const sendError = function (responseHandler: Response, {
    code,
    message,
    errors,
    ...rest
}: Params) {
    responseHandler.status(code || 500).json({
        status: 'Error',
        message: message || "Internal Server Error",
        errors: errors,
        ...rest,
    })
}


export const sendSuccess = function (responseHandler: Response, {code, message, data, total, ...rest}: Params = {}) {
    responseHandler.status(code || 200).json({
        status: 'Success',
        message: message ?? "Operation Done Successfully",
        total: total,
        data: data,
        ...rest
    })
}