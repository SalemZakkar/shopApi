import {Action} from "../abilities/actions.enum";
import {Subject} from "../abilities/subject.enum";
import {Request, Response, NextFunction} from "express";
import {defineAbility} from "../abilities/permissions";
import {NoPermissionsError} from "../../common/models/app-error";
import {accessibleBy} from "@casl/mongoose";

export const permissionMiddleware = (actions: Array<Action>, subject: Subject) => {


    return (req: Request, res: Response, next: NextFunction) => {

        let k = true;
        let user = (req as any).user;
        let permissions = defineAbility({id: user.id, role: user.role,})
        let mongoQuery: any;
        actions.forEach((e) => {
            let k = {}
            let rules = permissions.rulesFor(e, subject);
            for (let i = 0; i < rules.length; i++) {
                Object.assign(k, rules[i].conditions)
            }
            mongoQuery = Object.assign(k, mongoQuery);
        })
        actions.forEach((e) => {
            k &&= permissions.can(e, subject);
        })
        if (k) {
            (req as any).mongoQuery = mongoQuery;
            next()
        } else {
            throw new NoPermissionsError()
        }
    }
}
