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
var LineNotifyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineNotifyService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const log_service_1 = require("../log.service");
let LineNotifyService = LineNotifyService_1 = class LineNotifyService {
    constructor(httpService) {
        this.httpService = httpService;
        this.endPoint = 'https://notify-api.line.me/api/notify';
        this.logger = new log_service_1.LogService(LineNotifyService_1.name);
    }
    setData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.setData.name;
            try {
                if (data.message) {
                    yield this.callLineNotify(data.message, data.tokenLine);
                }
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
            }
        });
    }
    callLineNotify(message, tokenLine) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.callLineNotify.name;
            try {
                const params = new URLSearchParams();
                params.append('message', message);
                console.log('params', params);
                return new Promise((resolve, reject) => {
                    this.httpService
                        .post(`${this.endPoint}`, params, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: 'Bearer' + ' ' + tokenLine,
                        },
                    })
                        .subscribe(resp => {
                        this.logger.debug('success');
                        this.logger.debug('RESP LINE -> ', resp.data);
                        return resolve(resp.data);
                    }, error => {
                        this.logger.error(error);
                        return reject(error);
                    });
                });
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
            }
        });
    }
};
LineNotifyService = LineNotifyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], LineNotifyService);
exports.LineNotifyService = LineNotifyService;
//# sourceMappingURL=line-notify.service.js.map