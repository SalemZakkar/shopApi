import {Error} from "mongoose";

export class AppError extends Error {
    code: number;
    message: string;
    isOperational: boolean;


    constructor(message: string, code: number, isOperational: boolean = true,) {
        super(message);
        this.code = code;
        this.message = message;
        this.isOperational = isOperational;
        Error.captureStackTrace(this)
    }
}

export class NoPermissionsError extends AppError {
    message: string;

    constructor(message: string = "You Don't have permissions to do this request") {
        super(message, 403);
        this.message = message;
    }
}


export class NotFoundError extends AppError {
    message: string;

    constructor(message: string = "Resource Not Found") {
        super(message, 404);
        this.message = message;
    }
}

export class UnAuthenticated extends AppError {

    constructor() {
        super("UnAuthenticated", 401);
        this.message = "UnAuthenticated";
    }
}

export class ErrorInput extends AppError {
    message: string;

    constructor(message: string = "Error Input", public errors?: any) {
        super(message, 400);
        this.message = message;
    }
}