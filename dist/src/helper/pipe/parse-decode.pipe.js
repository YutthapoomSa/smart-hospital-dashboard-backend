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
var ParseDecodePipe_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseDecodePipe = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("./../../shared/config/config.service");
const encryption_service_1 = require("./../services/encryption.service");
const log_service_1 = require("./../services/log.service");
let ParseDecodePipe = ParseDecodePipe_1 = class ParseDecodePipe {
    constructor(configService, encryptionService) {
        this.configService = configService;
        this.encryptionService = encryptionService;
        this.logger = new log_service_1.LogService(ParseDecodePipe_1.name);
    }
    transform(value, metadata) {
        try {
            const textDecode = this.encryptionService.decode(value);
            this.logger.debug(textDecode);
            return textDecode;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
ParseDecodePipe = ParseDecodePipe_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, encryption_service_1.EncryptionService])
], ParseDecodePipe);
exports.ParseDecodePipe = ParseDecodePipe;
//# sourceMappingURL=parse-decode.pipe.js.map