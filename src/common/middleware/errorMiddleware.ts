import {ErrorRequestHandler} from "express";
import mongoose from "mongoose";
import {AppError, UnAuthenticated} from "../models/app-error";
import {sendError} from "../utils/utils/sendResponse";
// import jwt from "jsonwebtoken";

export const errorHandlerMiddleWare: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    // let message = err.message || 'Internal Server Error';

    if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        // message = `Invalid ${err.path}: "${err.value}"`;
    }

    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        // message = Object.values(err.errors)
        //     .map((e) => e.message)
        //     .join(', ');
    }
    if (err.code === 11000) {
        statusCode = 400;
        // const field = Object.keys(err.keyValue)[0];
        // const value = err.keyValue[field];
        // message = `Duplicate value for "${field}": "${value}"`;
    }

    if (err.name == 'JsonWebTokenError' || err.name == 'TokenExpiredError' || err.name == "UnauthorizedError") {
        err = new UnAuthenticated()
    }

    if (err instanceof AppError) {
        statusCode = err.code;
    }

    sendError(res, {code: statusCode, errors: err.errors, message: err.message,stack: err.stack})
};