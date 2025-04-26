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
        this.request.query.skip ||= '0';
        this.request.query.limit ||= '10';
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
        let temp = JSON.stringify(q)
        temp = temp.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
            return '$' + match
        })
        this.query = this.query.find(JSON.parse(temp))
        return this;
    }


}