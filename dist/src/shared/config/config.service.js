"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = __importDefault(require("../../../config"));
let ConfigService = class ConfigService {
    get sequelizeOrmConfig() {
        return config_1.default.database;
    }
    get jwtConfig() {
        return { privateKey: config_1.default.jwtPrivateKey };
    }
    get loginConfig() {
        return { privateKey: config_1.default.loginConfig };
    }
    get omiseConfig() {
        return {
            secretKey: config_1.default.omiseConfig.secretKey,
        };
    }
    get genPointUpload() {
        return {
            endpoint: config_1.default.imagePath.uploadEndpoint,
        };
    }
    get getImagePath() {
        return {
            endPoint: config_1.default.imagePath.uploadEndpoint,
        };
    }
};
ConfigService = __decorate([
    (0, common_1.Injectable)()
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map