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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./../../database/entity/user.entity");
const user_decorator_1 = require("./../../helper/guard/user.decorator");
const create_menu_dto_1 = require("./dto/create-menu.dto");
const update_menu_dto_1 = require("./dto/update-menu.dto");
const api_menu_service_1 = require("./service/api-menu.service");
const menu_service_1 = require("./service/menu.service");
let MenuController = class MenuController {
    constructor(menuService, apiMenuService) {
        this.menuService = menuService;
        this.apiMenuService = apiMenuService;
    }
    create(user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiMenuService.api_create(body, user);
        });
    }
    update(menu_id, updateMenuDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiMenuService.api_update(menu_id, updateMenuDto);
        });
    }
    findOne(menu_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiMenuService.api_findOne(menu_id);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.apiMenuService.api_findAll();
        });
    }
};
__decorate([
    (0, common_1.Post)('createMenu'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOkResponse)({ type: create_menu_dto_1.CreateMenuResDTO }),
    (0, swagger_1.ApiOperation)({ summary: 'สร้างรายการเมนู' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserDB, create_menu_dto_1.CreateMenuDTO]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/updateMenu'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOkResponse)({ type: create_menu_dto_1.CreateMenuResDTO }),
    (0, swagger_1.ApiOperation)({ summary: 'อัพเดตรายการเมนู' }),
    __param(0, (0, common_1.Param)('menu_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_menu_dto_1.UpdateMenuDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ค้นหารายการเมนูโดย id' }),
    __param(0, (0, common_1.Param)('menu_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('Menu/findAllMenu'),
    (0, swagger_1.ApiOperation)({ summary: 'findAll menu' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findAll", null);
MenuController = __decorate([
    (0, swagger_1.ApiTags)('Menu'),
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService, api_menu_service_1.ApiMenuService])
], MenuController);
exports.MenuController = MenuController;
//# sourceMappingURL=menu.controller.js.map