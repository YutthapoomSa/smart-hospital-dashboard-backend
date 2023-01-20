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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const crypto_js_1 = __importDefault(require("crypto-js"));
const config_service_1 = require("./../../shared/config/config.service");
let EncryptionService = class EncryptionService {
    constructor(configService) {
        this.configService = configService;
    }
    decode(textEncryption) {
        textEncryption = textEncryption.split('xMl3Jk').join('+');
        textEncryption = textEncryption.split('Por21Ld').join('/');
        textEncryption = textEncryption.split('Ml32').join('=');
        const text = crypto_js_1.default.AES.decrypt(textEncryption, this.configService.loginConfig.privateKey.loginPrivateKey);
        return text.toString(crypto_js_1.default.enc.Utf8);
    }
    encode(textEncryption) {
        let data = crypto_js_1.default.AES.encrypt(textEncryption, this.configService.loginConfig.privateKey.loginPrivateKey).toString();
        data = data.split('+').join('xMl3Jk');
        data = data.split('/').join('Por21Ld');
        data = data.split('=').join('Ml32');
        return data;
    }
};
EncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], EncryptionService);
exports.EncryptionService = EncryptionService;
//# sourceMappingURL=encryption.service.js.map