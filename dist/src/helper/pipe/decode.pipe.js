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
var DecodePipe_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodePipe = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("./../../shared/config/config.service");
const encryption_service_1 = require("./../services/encryption.service");
const log_service_1 = require("./../services/log.service");
let DecodePipe = DecodePipe_1 = class DecodePipe {
    constructor(configService, encryptionService) {
        this.configService = configService;
        this.encryptionService = encryptionService;
        this.logger = new log_service_1.LogService(DecodePipe_1.name);
    }
    transform(value, metadata) {
        console.log(value);
        if (!value)
            throw new common_1.HttpException('data no encrypt #1.', common_1.HttpStatus.BAD_REQUEST);
        if (!value.data)
            throw new common_1.HttpException('data no encrypt #2.', common_1.HttpStatus.BAD_REQUEST);
        let json = null;
        let textDecode = null;
        try {
            textDecode = this.encryptionService.decode(value.data);
            console.log(textDecode);
            json = JSON.parse(textDecode);
            this.logger.debug(JSON.stringify(json));
        }
        catch (error) {
            this.logger.debug(textDecode);
            this.logger.error(error);
        }
        return json;
    }
};
DecodePipe = DecodePipe_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, encryption_service_1.EncryptionService])
], DecodePipe);
exports.DecodePipe = DecodePipe;
//# sourceMappingURL=decode.pipe.js.map