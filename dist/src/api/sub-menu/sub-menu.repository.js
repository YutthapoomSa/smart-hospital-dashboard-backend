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
var SubMenuRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubMenuRepository = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("./../../helper/services/log.service");
const database_providers_1 = require("./../../database/database.providers");
const sequelize_typescript_1 = require("sequelize-typescript");
let SubMenuRepository = SubMenuRepository_1 = class SubMenuRepository {
    constructor(sequelize, subMenuRepositoryModel) {
        this.sequelize = sequelize;
        this.subMenuRepositoryModel = subMenuRepositoryModel;
        this.logger = new log_service_1.LogService(SubMenuRepository_1.name);
    }
    onApplicationBootstrap() {
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.findAll.name;
            try {
                const result = yield this.subMenuRepositoryModel.findAll();
                if (!result)
                    throw new Error('no data found try again later');
                return result;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.findOne.name;
            try {
                const result = yield this.subMenuRepositoryModel.findByPk(id);
                if (!result)
                    throw new Error('no data found');
                return result;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
};
SubMenuRepository = SubMenuRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SEQUELIZE')),
    __param(1, (0, common_1.Inject)(database_providers_1.DataBase.SubMenuDB)),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize, Object])
], SubMenuRepository);
exports.SubMenuRepository = SubMenuRepository;
//# sourceMappingURL=sub-menu.repository.js.map