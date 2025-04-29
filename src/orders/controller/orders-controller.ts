import {handler} from "../../common/utils/utils/handler";
import {OrderModel} from "../models/order-model";
import {mongo} from "../../db";
import {ProductModel} from "../../products/models/product-model";
import {ErrorInput, NoPermissionsError, NotFoundError} from "../../common/models/app-error";
import {sendSuccess} from "../../common/utils/utils/sendResponse";
import {UserModel} from "../../user/models/user-model";
import {BaseApiGet} from "../../common/models/base-api-get";
import {OrderStatus} from "../models/order-enum";
import {Role} from "../../common/models/role-enum";

export const AddOrder = handler(async (req, res, next) => {
    if (!req.body.products || req.body.products.length == 0) {
        throw new ErrorInput("Products can't be empty");
    }
    const session = await mongo.startSession();
    session.startTransaction();
    let total = 0;
    let orderProducts = [];
    let id = (req as any).mongoQuery.user || (req.body as any).user;
    const user = await UserModel.findById(id);
    if (!user) {
        throw new NotFoundError("User Not Found")
    }
    try {
        for (let i = 0; i < req.body.products.length; i++) {
            const item = req.body.products[i];

            const product = await (ProductModel.findById((item as any).product).session(session));
            if (!product) {
                throw new NotFoundError(`Product ${(item as any).product} not found`)
            }
            if (product.qty < (item as any).qty) {
                throw new ErrorInput(`Product ${(item as any).product} has only ${product.qty} got ${(item as any).qty}`)
            }
            product.qty -= (item as any).qty;
            await product.save({session});

            total += product.price * (item as any).qty;
            orderProducts.push({
                product: (item as any).product,
                quantity: (item as any).qty,
            })
            // console.log(item)
        }
        // console.log(orderProducts)
        let model = await (new OrderModel({
            products: orderProducts,
            total: total,
            user: id,
            city: req.body.city,
            note: req.body.note,
        })).save({session});
        await session.commitTransaction(); // Not awaited
        await session.endSession();
        sendSuccess(res, {data: model});
    } catch (e) {
        await session.abortTransaction(); // Not awaited
        await session.endSession();
        throw e;
    }
})

export const ChangeOrderStatus = handler(async (req, res, next) => {
    let model = await (OrderModel.findByIdAndUpdate(req.params.id, {status: req.body.status},{runValidators: true}));
    if (!model) {
        throw new NotFoundError();
    }
    sendSuccess(res)
})

export const DeleteOrder = handler(async (req, res, next) => {
    let user = (req as any).user;
    let model = await OrderModel.findById(req.params.id)
    if (!model) {
        throw new NotFoundError()
    }
    if (model?.status != OrderStatus.PENDING) {
        throw new ErrorInput("delete only when Pending")
    }
    if (model.user != user.id && user && user.role == Role.User) {
        throw new NoPermissionsError()
    }
    await OrderModel.findByIdAndDelete(req.params.id);
    sendSuccess(res)
})

export const GetOrders = handler(async (req, res, next) => {
    let model = new BaseApiGet(OrderModel.find((req as any).mongoQuery), req).filter().paginate();
    let data = await model.query.find().populate({model: "Product", path: "products.product"});
    let count = await model.query.clone().countDocuments();
    sendSuccess(res, {data: data, total: count,})

})

export const GetOrderById = handler(async (req, res, next) => {
        let model = await OrderModel.findById(req.params.id).populate({model: "Product", path: "products.product"});

        if (!model) {
            throw new NotFoundError()
        }

        if (model.user != (req as any).mongoQuery.user && (req as any).mongoQuery.user) {
            throw new NoPermissionsError();
        }
        sendSuccess(res, {data: model})
    }
)