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
var ApiUsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_typescript_1 = require("sequelize-typescript");
const database_providers_1 = require("./../../../database/database.providers");
const user_entity_1 = require("../../../database/entity/user.entity");
const convert_image_service_1 = require("../../../helper/services/convert-image.service");
const encryption_service_1 = require("../../../helper/services/encryption.service");
const log_service_1 = require("../../../helper/services/log.service");
const pagination_service_1 = require("../../../helper/services/pagination/pagination.service");
const config_service_1 = require("../../../shared/config/config.service");
const res_status_enum_1 = require("./../../../shared/enum/res-status.enum");
const find_one_user_res_dto_1 = require("./../dto/find-one-user-res.dto");
const users_service_1 = require("./users.service");
let ApiUsersService = ApiUsersService_1 = class ApiUsersService {
    constructor(cacheManager, usersRepository, userTokenRepository, userRepository, sequelize, configService, paginationService, encryptionService, convertImageService, usersService) {
        this.cacheManager = cacheManager;
        this.usersRepository = usersRepository;
        this.userTokenRepository = userTokenRepository;
        this.userRepository = userRepository;
        this.sequelize = sequelize;
        this.configService = configService;
        this.paginationService = paginationService;
        this.encryptionService = encryptionService;
        this.convertImageService = convertImageService;
        this.usersService = usersService;
        this.logger = new log_service_1.LogService(ApiUsersService_1.name);
    }
    onApplicationBootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    api_findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.api_findOne.name;
            try {
                return new find_one_user_res_dto_1.FindOneUserResDTO(res_status_enum_1.ResStatus.success, '', yield this.usersService.findOne(id));
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    api_login(userLoginRequestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.api_login.name;
            try {
                return yield this.usersService.login(userLoginRequestDto);
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    api_createWithAdmin(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.api_create.name;
            try {
                if (String(user.role) !== String(user_entity_1.UserDBRole.admin))
                    throw new common_1.HttpException('Not authorized', common_1.HttpStatus.UNAUTHORIZED);
                if (!body)
                    throw new Error('data is required');
                const email = yield this.usersService.isEmail(body.email);
                if (email) {
                    return new find_one_user_res_dto_1.FindOneUserResDTO(res_status_enum_1.ResStatus.fail, 'อีเมลนี้ถูกใช้ไปแล้ว', null);
                }
                const resultHash = yield this.usersService.genPassword(body.password);
                const _salt = resultHash.salt;
                const _hashPass = resultHash.hashPass;
                const users = new user_entity_1.UserDB();
                users.email = body.email.trim().toLowerCase();
                users.username = body.username.trim().toLowerCase();
                users.firstName = body.firstName;
                users.lastName = body.lastName;
                users.password = _hashPass;
                users.gender = body.gender;
                users.phoneNumber = body.phoneNumber;
                yield users.save();
                return new find_one_user_res_dto_1.FindOneUserResDTO(res_status_enum_1.ResStatus.success, '', users);
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    api_create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.api_create.name;
            try {
                if (!body)
                    throw new Error('data is required');
                const email = yield this.usersService.isEmail(body.email);
                if (email) {
                    return new find_one_user_res_dto_1.FindOneUserResDTO(res_status_enum_1.ResStatus.fail, 'อีเมลนี้ถูกใช้ไปแล้ว', null);
                }
                const resultHash = yield this.usersService.genPassword(body.password);
                const _salt = resultHash.salt;
                const _hashPass = resultHash.hashPass;
                const users = new user_entity_1.UserDB();
                users.email = body.email.trim().toLowerCase();
                users.username = body.username.trim().toLowerCase();
                users.firstName = body.firstName;
                users.lastName = body.lastName;
                users.password = _hashPass;
                users.gender = body.gender;
                users.phoneNumber = body.phoneNumber;
                yield users.save();
                return new find_one_user_res_dto_1.FindOneUserResDTO(res_status_enum_1.ResStatus.success, '', users);
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    api_refreshToken(user, createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.api_refreshToken.name;
            try {
                return yield this.usersService.refreshToken(user, createUserDto);
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
ApiUsersService = ApiUsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(1, (0, common_1.Inject)(database_providers_1.DataBase.UserDB)),
    __param(2, (0, common_1.Inject)(database_providers_1.DataBase.UserTokenDB)),
    __param(3, (0, common_1.Inject)(database_providers_1.DataBase.UserDB)),
    __param(4, (0, common_1.Inject)('SEQUELIZE')),
    __param(9, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [Object, Object, Object, Object, sequelize_typescript_1.Sequelize,
        config_service_1.ConfigService,
        pagination_service_1.PaginationService,
        encryption_service_1.EncryptionService,
        convert_image_service_1.ConvertImageService,
        users_service_1.UsersService])
], ApiUsersService);
exports.ApiUsersService = ApiUsersService;
//# sourceMappingURL=api-users.service.js.map