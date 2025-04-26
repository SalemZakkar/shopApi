import mongoose, {Mongoose} from "mongoose";


const toJson = (schema: any) => {
    let transform: any;
    if (schema.options.toJSON && schema.options.toJSON.transform) {
        transform = schema.options.toJSON.transform;
    }

    schema.options.toJSON = Object.assign({}, schema.options.toJSON, {
        transform(doc: any, ret: any, options: any) {
            Object.keys(schema.paths).forEach((path) => {
                if (schema.paths[path].instance === 'ObjectId' && typeof ret[path] === 'string') {
                    ret[path] = new mongoose.Types.ObjectId(ret[path]);
                }
            });
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
            if (transform) {
                return transform(doc, ret, options);
            }
        },
    });
};

export const mongo: Mongoose = mongoose.plugin(toJson);


export const connect = async () => {
    await mongo.connect(process.env.DATABASE_URL!, {
        dbName: process.env.DBNAME
    });
}
