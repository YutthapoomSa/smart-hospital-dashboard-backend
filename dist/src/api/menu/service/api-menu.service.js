"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ApiMenuService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMenuService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const database_providers_1 = require("./../../../database/database.providers");
const log_service_1 = require("./../../../helper/services/log.service");
const create_menu_dto_1 = require("../dto/create-menu.dto");
const menu_service_1 = require("./menu.service");
const res_status_enum_1 = require("src/shared/enum/res-status.enum");
let ApiMenuService = ApiMenuService_1 = class ApiMenuService {
    constructor(menuRepository, sequelize, menuService) {
        this.menuRepository = menuRepository;
        this.sequelize = sequelize;
        this.menuService = menuService;
        this.logger = new log_service_1.LogService(ApiMenuService_1.name);
    }
    onApplicationBootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    api_create(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.api_create.name;
            try {
                return new create_menu_dto_1.CreateMenuResDTO(res_status_enum_1.ResStatus.success, '', yield this.menuService.create(body, user));
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    api_update(menu_id, updateMenuDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.api_update.name;
            try {
                return new create_menu_dto_1.CreateMenuResDTO(res_status_enum_1.ResStatus.success, '', yield this.menuService.update(menu_id, updateMenuDto));
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    api_findOne(menu_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.api_update.name;
            try {
                const result = yield this.menuService.findOne(menu_id);
                return result;
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    api_findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.api_findAll.name;
            try {
                const resultFindAll = yield this.menuService.findAll();
                return resultFindAll;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
};
ApiMenuService = ApiMenuService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_providers_1.DataBase.MenuDB)),
    __param(1, (0, common_1.Inject)('SEQUELIZE')),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => menu_service_1.MenuService))),
    __metadata("design:paramtypes", [Object, sequelize_1.Sequelize,
        menu_service_1.MenuService])
], ApiMenuService);
exports.ApiMenuService = ApiMenuService;
//# sourceMappingURL=api-menu.service.js.map