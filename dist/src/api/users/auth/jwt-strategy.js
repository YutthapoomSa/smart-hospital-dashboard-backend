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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const users_service_1 = require("../services/users.service");
const encryption_service_1 = require("./../../../helper/services/encryption.service");
const log_service_1 = require("./../../../helper/services/log.service");
const config_service_1 = require("./../../../shared/config/config.service");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(usersService, configService, encryptionService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.jwtConfig.privateKey,
        });
        this.usersService = usersService;
        this.configService = configService;
        this.encryptionService = encryptionService;
        this.logger = new log_service_1.LogService(JwtStrategy_1.name);
    }
    validate(payload, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!payload && !payload.id) {
                    return done(new common_1.HttpException({}, common_1.HttpStatus.UNAUTHORIZED), false);
                }
                const key = this.configService.loginConfig.privateKey.loginPrivateKey;
                payload.id = this.encryptionService.decode(payload.id);
                payload.jit = this.encryptionService.decode(payload.jit);
                payload.role = this.encryptionService.decode(payload.role);
                const isToken = yield this.usersService.verifyAccessToken(payload.jit);
                if (!isToken)
                    return done(new common_1.HttpException({}, common_1.HttpStatus.UNAUTHORIZED), false);
                return done(null, payload, payload.iat);
            }
            catch (error) {
                this.logger.error(error);
                return done(new common_1.HttpException(error, common_1.HttpStatus.UNAUTHORIZED), false);
            }
        });
    }
};
JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, config_service_1.ConfigService, encryption_service_1.EncryptionService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt-strategy.js.map