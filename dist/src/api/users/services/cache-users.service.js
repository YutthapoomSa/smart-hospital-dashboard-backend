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
var CacheUsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheUsersService = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("../../../helper/services/log.service");
let CacheUsersService = CacheUsersService_1 = class CacheUsersService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        this.logger = new log_service_1.LogService(CacheUsersService_1.name);
    }
    onApplicationBootstrap() {
        this.removeAll();
    }
    setCacheUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.setCacheUser.name;
            try {
                yield this.cacheManager.set(`user${user.id}`, user.toJSON(), {
                    ttl: 60 * 5,
                });
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    getCacheUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.getCacheUser.name;
            try {
                const cache = yield this.cacheManager.get(`user${id}`);
                if (cache) {
                    const _data = JSON.parse(`${cache}`);
                    return _data;
                }
                return null;
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    removeCacheUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.removeCacheUser.name;
            try {
                const removeCache = yield this.cacheManager.del(`user${id}`);
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    removeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.removeAll.name;
            try {
                const removeCache = yield this.cacheManager.reset();
            }
            catch (error) {
                this.logger.error(`${tag} -> `, error);
                throw new common_1.HttpException(`${error}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
CacheUsersService = CacheUsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], CacheUsersService);
exports.CacheUsersService = CacheUsersService;
//# sourceMappingURL=cache-users.service.js.map