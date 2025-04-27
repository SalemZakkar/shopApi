import {AbilityBuilder, MongoAbility, createMongoAbility} from '@casl/ability';
import {Action} from './actions.enum';
import {Subject} from './subject.enum';
import {Role} from "../../common/models/role-enum";

type AppAbility = MongoAbility<[Action, Subject | any]>;

interface UserContext {
    id: string;
    role: 'admin' | 'employee' | 'user';
}

export function defineAbility(user: UserContext): AppAbility {
    const {can, cannot, build} = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.role === Role.Admin) {
        can(Action.Manage, 'all');
    }

    if (user.role === Role.Employee) {
        can([Action.Manage], Subject.Product);
        can([Action.Manage], Subject.Category);
        can([Action.Read, Action.Update], Subject.Order);
        can(Action.Read, Subject.User);
    }

    if (user.role === Role.User) {
        can([Action.Read, Action.Update], Subject.User, {id: user.id});
        can([Action.Create, Action.Read, Action.Delete], Subject.Order, {user: user.id});
        can([Action.Read,], Subject.Category,);
        can(Action.Read, Subject.Product);
    }

    return build();
}