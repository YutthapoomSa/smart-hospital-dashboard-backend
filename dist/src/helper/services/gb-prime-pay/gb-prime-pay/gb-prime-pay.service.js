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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var GbPrimePayService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GbPrimePayService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const log_service_1 = require("../../log.service");
const config_service_1 = require("./../../../../shared/config/config.service");
let GbPrimePayService = GbPrimePayService_1 = class GbPrimePayService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.endPoint = 'https://api.gbprimepay.com';
        this.TOKEN = 'Tfusz4oteMGO29IitdARWtxgYSVhU1UbRS2fIDg6uYavSzwDP9e4NgmV1pcZdfLO8xeOPp7gZYf9cbUomHhN1MjpZyw8BUb9P0vtSJQig4mYRW9lNFc6rwYeEGhmKkM0zsHMnXJlO6aT/68msLU+W/UV6z5FZ1bSl6xBrX4gAf90rw52';
        this.logger = new log_service_1.LogService(GbPrimePayService_1.name);
    }
    createTransaction(referenceNo, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.createTransaction.name;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result1 = yield this.call_createTransaction(referenceNo, amount);
                }
                catch (error) {
                    this.logger.error(`${tag} -> `, error);
                }
            }));
        });
    }
    call_createTransaction(referenceNo, amount) {
        this.logger.debug('referenceNo : ', referenceNo);
        const params = new URLSearchParams();
        params.append('token', this.TOKEN);
        params.append('referenceNo', referenceNo);
        params.append('amount', amount);
        params.append('backgroundUrl', 'https://perfect-lizard-54.loca.lt/cart/callback');
        return new Promise((resolve, reject) => {
            this.httpService
                .post(`${this.endPoint}/gbp/gateway/qrcode`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                responseType: 'stream',
            })
                .subscribe((resp) => __awaiter(this, void 0, void 0, function* () {
                this.logger.debug('success');
                const _path = path_1.default.join(__dirname, '../../../../upload-qr');
                const _fileName = `${new Date().getTime()}.png`;
                const _fullPath = `${_path}/${_fileName}`;
                const writer = fs_1.default.createWriteStream(_fullPath);
                resp.data.pipe(writer);
                writer.on('finish', () => {
                    return resolve({
                        fileName: _fileName,
                        destination: _path,
                        path: _fullPath,
                    });
                });
                writer.on('error', reject);
            }), (err) => {
                this.logger.error(err);
                return reject(err);
            });
        });
    }
};
GbPrimePayService = GbPrimePayService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.HttpService, config_service_1.ConfigService])
], GbPrimePayService);
exports.GbPrimePayService = GbPrimePayService;
//# sourceMappingURL=gb-prime-pay.service.js.map