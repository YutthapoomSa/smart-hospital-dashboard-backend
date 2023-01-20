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
var MenuService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const database_providers_1 = require("./../../../database/database.providers");
const log_service_1 = require("./../../../helper/services/log.service");
const menu_entity_1 = require("./../../../database/entity/menu.entity");
const user_entity_1 = require("./../../../database/entity/user.entity");
let MenuService = MenuService_1 = class MenuService {
    constructor(menuRepository, sequelize) {
        this.menuRepository = menuRepository;
        this.sequelize = sequelize;
        this.logger = new log_service_1.LogService(MenuService_1.name);
    }
    onApplicationBootstrap() {
    }
    create(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.create.name;
            try {
                if (String(user.role) !== String(user_entity_1.UserDBRole.admin))
                    throw new common_1.HttpException('Not authorized', common_1.HttpStatus.UNAUTHORIZED);
                if (!body)
                    throw new Error('data is required');
                const menuCreate = new menu_entity_1.MenuDB();
                menuCreate.menu_name = body.menu_name;
                menuCreate.menu_icon = body.menu_icon;
                menuCreate.url = body.url;
                yield menuCreate.save();
                return menuCreate;
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    update(menu_id, updateMenuDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.update.name;
            try {
                if (!menu_id)
                    throw new Error('id is required');
                if (!updateMenuDto)
                    throw new Error('updateMenuDto is required');
                const resultUpdate = yield this.menuRepository.findOne({
                    where: {
                        id: menu_id,
                    },
                });
                if (!resultUpdate)
                    throw new Error('no data found with this id maybe is invalid or deleted try again later..');
                resultUpdate.menu_name = updateMenuDto.menu_name || resultUpdate.menu_name;
                resultUpdate.menu_icon = updateMenuDto.menu_icon || resultUpdate.menu_icon;
                resultUpdate.url = updateMenuDto.url || resultUpdate.url;
                yield resultUpdate.save();
                return resultUpdate;
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.findAll.name;
            try {
                const result = yield this.menuRepository.findAll({
                    include: [
                        {
                            model: menu_entity_1.MenuDB,
                        },
                    ],
                });
                if (!result)
                    throw new Error('no data found try again later');
                return result;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    findOne(menu_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.findAll.name;
            try {
                const result = yield this.menuRepository.findByPk(menu_id);
                if (!result) {
                    throw new Error('not found');
                }
                return result;
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    remove(id) {
        return `This action removes a #${id} menu`;
    }
};
MenuService = MenuService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_providers_1.DataBase.MenuDB)),
    __param(1, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [Object, sequelize_1.Sequelize])
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map