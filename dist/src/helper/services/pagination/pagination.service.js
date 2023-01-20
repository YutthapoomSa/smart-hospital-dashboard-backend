"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PaginationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const log_service_1 = require("./../log.service");
let PaginationService = PaginationService_1 = class PaginationService {
    constructor() {
        this.logger = new log_service_1.LogService(PaginationService_1.name);
    }
    paginationCal(total, perPage, pageCurrent) {
        return {
            skips: perPage * pageCurrent - perPage,
            totalPages: Math.ceil(total / perPage),
            limit: perPage,
        };
    }
    genSqlLike(attributes, textSearch) {
        try {
            if (attributes.length === 0)
                throw new Error('attributes empty.');
            if (!textSearch)
                throw new Error('textSearch empty.');
            const likes = [];
            attributes.forEach(x => {
                const obj = {};
                obj[`${x}`] = { [sequelize_1.Op.like]: `%${textSearch}%` };
                likes.push(obj);
            });
            if (likes.length === 0)
                return null;
            return { where: { [sequelize_1.Op.or]: likes } };
        }
        catch (error) {
            this.logger.error(`genSqlLike -> ${error}`);
        }
        return null;
    }
};
PaginationService = PaginationService_1 = __decorate([
    (0, common_1.Injectable)()
], PaginationService);
exports.PaginationService = PaginationService;
//# sourceMappingURL=pagination.service.js.map