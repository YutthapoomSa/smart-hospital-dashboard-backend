"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const database_module_1 = require("./../database/database.module");
const convert_image_service_1 = require("./../helper/services/convert-image.service");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const pagination_service_1 = require("../helper/services/pagination/pagination.service");
const app_service_1 = require("./../helper/services/app.service");
const encryption_service_1 = require("./../helper/services/encryption.service");
const line_notify_service_1 = require("./../helper/services/line-notify/line-notify.service");
const config_service_1 = require("./config/config.service");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            config_service_1.ConfigService,
            pagination_service_1.PaginationService,
            encryption_service_1.EncryptionService,
            convert_image_service_1.ConvertImageService,
            app_service_1.AppService,
            line_notify_service_1.LineNotifyService,
        ],
        exports: [
            config_service_1.ConfigService,
            pagination_service_1.PaginationService,
            encryption_service_1.EncryptionService,
            convert_image_service_1.ConvertImageService,
            app_service_1.AppService,
            line_notify_service_1.LineNotifyService,
            common_1.CacheModule.register(),
            database_module_1.DatabaseModule,
        ],
        imports: [
            axios_1.HttpModule.register({
                timeout: 60000,
            }),
            common_1.CacheModule.register(),
            database_module_1.DatabaseModule,
        ],
        controllers: [],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map