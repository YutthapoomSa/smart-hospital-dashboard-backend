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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const database_providers_1 = require("./../../../database/database.providers");
const uuid_1 = require("uuid");
const user_token_entity_1 = require("../../../database/entity/user-token.entity");
const convert_image_service_1 = require("../../../helper/services/convert-image.service");
const encryption_service_1 = require("../../../helper/services/encryption.service");
const log_service_1 = require("../../../helper/services/log.service");
const config_service_1 = require("../../../shared/config/config.service");
const user_check_dto_1 = require("../dto/user-check.dto");
const res_status_enum_1 = require("./../../../shared/enum/res-status.enum");
const cache_users_service_1 = require("./cache-users.service");
let UsersService = UsersService_1 = class UsersService {
    constructor(cacheManager, usersRepository, userTokenRepository, userRepository, sequelize, configService, encryptionService, convertImageService, cacheUsersService) {
        this.cacheManager = cacheManager;
        this.usersRepository = usersRepository;
        this.userTokenRepository = userTokenRepository;
        this.userRepository = userRepository;
        this.sequelize = sequelize;
        this.configService = configService;
        this.encryptionService = encryptionService;
        this.convertImageService = convertImageService;
        this.cacheUsersService = cacheUsersService;
        this.logger = new log_service_1.LogService(UsersService_1.name);
        this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
    }
    onApplicationBootstrap() {
        this.initSuperAdmin();
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.update.name;
            try {
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.findOne.name;
            try {
                const resultGetCache = yield this.cacheUsersService.getCacheUser(id);
                if (resultGetCache)
                    return resultGetCache;
                const user = yield this.usersRepository.findByPk(id);
                if (!user)
                    throw new common_1.HttpException('User with given id not found', common_1.HttpStatus.NOT_FOUND);
                user.image = this.convertImageService.getLinkImage(user.image);
                yield this.cacheUsersService.setCacheUser(user);
                return user;
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    isEmail(_email) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.isEmail.name;
            try {
                const findEmail = yield this.usersRepository.findOne({
                    where: {
                        email: _email,
                    },
                });
                return findEmail ? true : false;
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    genPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.genPassword.name;
            try {
                const _salt = yield bcrypt_1.default.genSalt(10);
                const _hashPass = yield bcrypt_1.default.hash(password, _salt);
                return {
                    salt: _salt,
                    hashPass: _hashPass,
                };
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.login.name;
            try {
                const res = {
                    resCode: res_status_enum_1.ResStatus.success,
                    resData: {},
                    msg: '',
                };
                const user = yield this.usersRepository.findOne({
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    where: {
                        username: body.username,
                    },
                });
                if (!user) {
                    throw new common_1.HttpException('Invalid username or email or password.', common_1.HttpStatus.BAD_REQUEST);
                }
                const _isMatch = yield bcrypt_1.default.compare(body.password, user.password);
                if (!_isMatch) {
                    throw new common_1.HttpException('Invalid email or password.', common_1.HttpStatus.BAD_REQUEST);
                }
                const _accessToken = yield this.signToken(user, '1h');
                const _refreshToken = yield this.signToken(user, '1d');
                let _expire = (0, moment_1.default)().add(1, 'd');
                _expire = _expire.add(5, 'm');
                const tokenDB = new user_token_entity_1.UserTokenDB();
                tokenDB.accessToken = _accessToken.jit;
                tokenDB.refreshToken = _refreshToken.jit;
                tokenDB.expire = _expire.toISOString();
                tokenDB.userId = user.id;
                yield tokenDB.save();
                user.image = this.convertImageService.getLinkImage(user.image);
                const _user = user.toJSON();
                delete _user.password;
                res.resData = _user;
                res.resData = Object.assign(res.resData, { accessToken: _accessToken.token });
                res.resData = Object.assign(res.resData, { refreshToken: _refreshToken.token });
                res.resData = Object.assign(res.resData, { expire: _expire });
                return res;
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    refreshToken(user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.refreshToken.name;
            try {
                this.logger.debug(`${tag} -> body : `, body);
                const decodedAccessToken = (0, jwt_decode_1.default)(body.accessToken);
                this.logger.debug(`${tag} -> decodedAccessToken : `, decodedAccessToken);
                const decodedAccessToken2 = this.encryptionService.decode(decodedAccessToken.jit);
                this.logger.debug(`${tag} -> decodedAccessToken2 : `, decodedAccessToken2);
                const decodedRefreshToken = (0, jwt_decode_1.default)(body.refreshToken);
                this.logger.debug(`${tag} -> decodedRefreshToken : `, decodedRefreshToken);
                const decodedRefreshToken2 = this.encryptionService.decode(decodedRefreshToken.jit);
                this.logger.debug(`${tag} -> decodedRefreshToken2 : `, decodedRefreshToken2);
                const res = {
                    resCode: res_status_enum_1.ResStatus.success,
                    resData: {},
                    msg: '',
                };
                const result = yield this.userTokenRepository.findOne({
                    where: {
                        userId: user.id,
                        refreshToken: decodedRefreshToken2,
                        accessToken: decodedAccessToken2,
                    },
                });
                if (!result) {
                    const value = yield this.cacheManager.get(`a_token${decodedAccessToken2}`);
                    if (value) {
                        yield this.cacheManager.del(`a_token${decodedAccessToken2}`);
                        throw new common_1.HttpException('Invalid refresh token.', common_1.HttpStatus.UNAUTHORIZED);
                    }
                    else {
                        throw new common_1.HttpException('Invalid test1.', common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                const _accessToken = yield this.signToken(user, '1h');
                const _refreshToken = yield this.signToken(user, '1d');
                let _expire = (0, moment_1.default)().add(1, 'd');
                _expire = _expire.add(5, 'm');
                const tokenDB = new user_token_entity_1.UserTokenDB();
                tokenDB.accessToken = _accessToken.jit;
                tokenDB.refreshToken = _refreshToken.jit;
                tokenDB.expire = _expire.toISOString();
                tokenDB.userId = user.id;
                yield tokenDB.save();
                this.logger.debug('save');
                res.resData = Object.assign(res.resData, { accessToken: _accessToken.token });
                res.resData = Object.assign(res.resData, { refreshToken: _refreshToken.token });
                res.resData = Object.assign(res.resData, { expire: _expire });
                yield result.destroy();
                return res;
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                if (!!error && !!error.status && error.status === 401) {
                    throw new common_1.UnauthorizedException();
                }
                else {
                    throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        });
    }
    verifyAccessToken(jit) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.verifyAccessToken.name;
            try {
                const value = yield this.cacheManager.get(`a_token${jit}`);
                if (value) {
                    return true;
                }
                const count = yield this.userTokenRepository.count({
                    where: { accessToken: jit },
                });
                const isCount = count > 0;
                if (isCount) {
                    yield this.cacheManager.set(`a_token${jit}`, isCount, { ttl: 60 * 5 });
                }
                return isCount;
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    verifyRefreshToken(jit) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.verifyRefreshToken.name;
            try {
                const count = yield this.userTokenRepository.count({
                    where: { refreshToken: jit },
                });
                const isCount = count > 0;
                if (isCount) {
                }
                return isCount;
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    checkUserName(_username) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.usersRepository.count({
                where: {
                    username: _username,
                },
            });
            return new user_check_dto_1.UserNameCheckResDTO(count > 0);
        });
    }
    initSuperAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.initSuperAdmin.name;
            try {
                const result = yield this.usersRepository.findOne({
                    where: { username: 'superAdmin' },
                });
                if (!result) {
                }
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    signToken(user, expires) {
        return __awaiter(this, void 0, void 0, function* () {
            const _jit = (0, uuid_1.v4)();
            const enDeCodeId = this.encryptionService.encode(user.id.toString());
            const enDeCodeJit = this.encryptionService.encode(_jit);
            const enDeCodeRole = this.encryptionService.encode(user.role);
            const payload = {
                id: enDeCodeId,
                role: enDeCodeRole,
                jit: enDeCodeJit,
            };
            const _expires = expires || '1y';
            return {
                token: (0, jsonwebtoken_1.sign)(payload, this.jwtPrivateKey, { expiresIn: _expires }),
                jit: _jit,
            };
        });
    }
    getAllUserId() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const result = yield this.usersRepository.findAll({ attributes: ['id'] });
                return resolve(result.map((x) => x.id));
            }));
        });
    }
    cronLoginToken() {
        this.logger.debug(`cron -> EVERY_DAY_AT_11PM`);
        const _moment = (0, moment_1.default)().toISOString();
        this.userTokenRepository.destroy({
            where: {
                expire: {
                    [sequelize_1.Op.lte]: _moment,
                },
            },
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_11PM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersService.prototype, "cronLoginToken", null);
UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(1, (0, common_1.Inject)(database_providers_1.DataBase.UserDB)),
    __param(2, (0, common_1.Inject)(database_providers_1.DataBase.UserTokenDB)),
    __param(3, (0, common_1.Inject)(database_providers_1.DataBase.UserDB)),
    __param(4, (0, common_1.Inject)('SEQUELIZE')),
    __param(8, (0, common_1.Inject)((0, common_1.forwardRef)(() => cache_users_service_1.CacheUsersService))),
    __metadata("design:paramtypes", [Object, Object, Object, Object, sequelize_typescript_1.Sequelize,
        config_service_1.ConfigService,
        encryption_service_1.EncryptionService,
        convert_image_service_1.ConvertImageService,
        cache_users_service_1.CacheUsersService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map