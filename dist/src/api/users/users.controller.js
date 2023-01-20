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
exports.UsersController = void 0;
const find_one_user_res_dto_1 = require("./dto/find-one-user-res.dto");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./../../database/entity/user.entity");
const user_decorator_1 = require("./../../helper/guard/user.decorator");
const create_user_req_dto_1 = require("./dto/create-user-req.dto");
const api_users_service_1 = require("./services/api-users.service");
const user_login_dto_1 = require("./dto/user-login.dto");
const user_login_refreshToken_dto_1 = require("./dto/user-login-refreshToken.dto");
let UsersController = class UsersController {
    constructor(apiUsersService) {
        this.apiUsersService = apiUsersService;
    }
    register(body) {
        return this.apiUsersService.api_create(body);
    }
    registerWithAdmin(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiUsersService.api_createWithAdmin(body, user);
        });
    }
    login(body) {
        return this.apiUsersService.api_login(body);
    }
    find(id) {
        return this.apiUsersService.api_findOne(id);
    }
    refreshToken(user, body) {
        return this.apiUsersService.api_refreshToken(user, body);
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOkResponse)({ type: find_one_user_res_dto_1.FindOneUserResDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_req_dto_1.CreateUserReqDTO]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('registerWithAdmin'),
    (0, swagger_1.ApiOkResponse)({ type: find_one_user_res_dto_1.FindOneUserResDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_req_dto_1.CreateUserReqDTO, user_entity_1.UserDB]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registerWithAdmin", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginRequestDTO]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOkResponse)({ type: find_one_user_res_dto_1.FindOneUserResDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "find", null);
__decorate([
    (0, common_1.Post)('refreshToken'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserDB, user_login_refreshToken_dto_1.UserLoginRefreshToKenReqDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "refreshToken", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('users'),
    __metadata("design:paramtypes", [api_users_service_1.ApiUsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map