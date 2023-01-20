"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = exports.dbProviders = exports.DataBase = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_service_1 = require("./../shared/config/config.service");
const user_password_entity_1 = require("./entity/user-password.entity");
const user_socket_entity_1 = require("./entity/user-socket.entity");
const user_token_entity_1 = require("./entity/user-token.entity");
const user_entity_1 = require("./entity/user.entity");
const menu_entity_1 = require("./entity/menu.entity");
const sub_menu_entity_1 = require("./entity/sub-menu.entity");
var DataBase;
(function (DataBase) {
    DataBase["UserDB"] = "UserDB";
    DataBase["UserTokenDB"] = "UserTokenDB";
    DataBase["UserSocketDB"] = "UserSocketDB";
    DataBase["UserPasswordDB"] = "UserPasswordDB";
    DataBase["MenuDB"] = "MenuDB";
    DataBase["SubMenuDB"] = "SubMenuDB";
})(DataBase = exports.DataBase || (exports.DataBase = {}));
exports.dbProviders = [
    {
        provide: DataBase.UserDB,
        useValue: user_entity_1.UserDB,
    },
    {
        provide: DataBase.UserTokenDB,
        useValue: user_token_entity_1.UserTokenDB,
    },
    {
        provide: DataBase.UserPasswordDB,
        useValue: user_password_entity_1.UserPasswordDB,
    },
    {
        provide: DataBase.UserSocketDB,
        useValue: user_socket_entity_1.UserSocketDB,
    },
    {
        provide: DataBase.MenuDB,
        useValue: menu_entity_1.MenuDB,
    },
    {
        provide: DataBase.SubMenuDB,
        useValue: sub_menu_entity_1.SubMenuDB,
    },
];
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
            const sequelize = new sequelize_typescript_1.Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([user_entity_1.UserDB, user_token_entity_1.UserTokenDB, user_socket_entity_1.UserSocketDB, user_password_entity_1.UserPasswordDB, menu_entity_1.MenuDB, sub_menu_entity_1.SubMenuDB]);
            return sequelize;
        }),
        inject: [config_service_1.ConfigService],
    },
];
//# sourceMappingURL=database.providers.js.map