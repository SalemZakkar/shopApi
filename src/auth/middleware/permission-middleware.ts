import {UserModel} from "../../user/models/user-model";
import {Action} from "../abilities/actions.enum";
import {Subject} from "../abilities/subject.enum";
import {Request, Response, NextFunction} from "express";
import {defineAbility} from "../abilities/permissions";
import {NoPermissionsError} from "../../common/models/app-error";

export const permissionMiddleware = (actions: Array<Action>, subject: Subject) => {


    return (req: Request, res: Response, next: NextFunction) => {
        let k = true;
        let user = (req as any).user;
        let permissions = defineAbility({id: user.id, role: user.role,})
        actions.forEach((e) => {
            k &&= permissions.can(e, subject);
        })
        if (k) {
            next()
        } else {
            throw new NoPermissionsError()
        }
    }
}
