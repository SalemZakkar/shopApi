import express from "express";

let app = express();

import * as cors from "cors";

import {config} from "dotenv";
import qs from "qs";
import {errorHandlerMiddleWare} from "./common/middleware/errorMiddleware";
import {CategoryModel} from "./categories/models/category-model";
import {sendSuccess} from "./common/utils/utils/sendResponse";

config()

app.set('query parser', (str: string) => qs.parse(str));

app.use(cors.default())

app.use(express.json())

app.use((req, res, next) => {
     CategoryModel.find().then((e) => {
        sendSuccess(
            res,
            {
                data: e
            }
        )
    })
})

app.use(errorHandlerMiddleWare)

export default app;