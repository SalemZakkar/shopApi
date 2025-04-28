import {Query} from "mongoose";
import {Request} from "express";

export class BaseApiGet {
    query: Query<any, any>;
    request: Request;

    constructor(query: Query<any, any>, request: Request) {
        this.query = query;
        this.request = request;
    }

    paginate() {
        this.query = this.query.skip(parseInt(this.request.query.skip?.toString() || '0'),)
            .limit(parseInt(this.request.query.limit?.toString() || '10'));
        return this;
    }

    filter() {
        let pop = ['skip', 'limit'];
        let q = this.request.query;
        pop.forEach((item) => {
            delete q[item];
        })
        let k = {}
        Object.keys(this.request.query).forEach((item) => {
            if (typeof q[item] === 'string') {
                (k as any)[item] = q[item];
                delete q[item];
            }
        })
        let temp = JSON.stringify(q)
        temp = temp.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
            return '$' + match
        })
        let objects = JSON.parse(temp)
        Object.assign(k, objects)
        this.query = this.query.find(k)
        return this;
    }


}