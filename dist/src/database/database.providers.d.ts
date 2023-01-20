import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from './../shared/config/config.service';
import { UserPasswordDB } from './entity/user-password.entity';
import { UserSocketDB } from './entity/user-socket.entity';
import { UserTokenDB } from './entity/user-token.entity';
import { UserDB } from './entity/user.entity';
import { MenuDB } from './entity/menu.entity';
import { SubMenuDB } from './entity/sub-menu.entity';
export declare enum DataBase {
    UserDB = "UserDB",
    UserTokenDB = "UserTokenDB",
    UserSocketDB = "UserSocketDB",
    UserPasswordDB = "UserPasswordDB",
    MenuDB = "MenuDB",
    SubMenuDB = "SubMenuDB"
}
export declare const dbProviders: ({
    provide: DataBase;
    useValue: typeof UserDB;
} | {
    provide: DataBase;
    useValue: typeof UserTokenDB;
} | {
    provide: DataBase;
    useValue: typeof UserPasswordDB;
} | {
    provide: DataBase;
    useValue: typeof UserSocketDB;
} | {
    provide: DataBase;
    useValue: typeof MenuDB;
} | {
    provide: DataBase;
    useValue: typeof SubMenuDB;
})[];
export declare const databaseProviders: {
    provide: string;
    useFactory: (configService: ConfigService) => Promise<Sequelize>;
    inject: (typeof ConfigService)[];
}[];
