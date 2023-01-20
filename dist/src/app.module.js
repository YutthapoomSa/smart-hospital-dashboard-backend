"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const throttler_1 = require("@nestjs/throttler");
const api_menu_service_1 = require("./api/menu/service/api-menu.service");
const users_module_1 = require("./api/users/users.module");
const convert_image_service_1 = require("./helper/services/convert-image.service");
const encryption_service_1 = require("./helper/services/encryption.service");
const log_service_1 = require("./helper/services/log.service");
const pagination_service_1 = require("./helper/services/pagination/pagination.service");
const shared_module_1 = require("./shared/shared.module");
const menu_module_1 = require("./api/menu/menu.module");
const sub_menu_module_1 = require("./api/sub-menu/sub-menu.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register(),
            users_module_1.UsersModule,
            shared_module_1.SharedModule,
            schedule_1.ScheduleModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 60,
            }),
            menu_module_1.MenuModule,
            sub_menu_module_1.SubMenuModule,
        ],
        providers: [api_menu_service_1.ApiMenuService, log_service_1.LogService, convert_image_service_1.ConvertImageService, encryption_service_1.EncryptionService, pagination_service_1.PaginationService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map