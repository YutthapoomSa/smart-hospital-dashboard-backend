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
var SubMenuService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubMenuService = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("./../../helper/services/log.service");
const res_status_enum_1 = require("./../../shared/enum/res-status.enum");
const findAll_SubMenu_dto_1 = require("./dto/findAll-SubMenu.dto");
const sub_menu_repository_1 = require("./sub-menu.repository");
let SubMenuService = SubMenuService_1 = class SubMenuService {
    constructor(subMenuRepository) {
        this.subMenuRepository = subMenuRepository;
        this.logger = new log_service_1.LogService(SubMenuService_1.name);
    }
    onApplicationBootstrap() {
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.findAll.name;
            try {
                const resultFindAll = yield this.subMenuRepository.findAll();
                return new findAll_SubMenu_dto_1.FindAllSubMenuResDTO(res_status_enum_1.ResStatus.success, '', resultFindAll);
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
                const resultFindOne = yield this.subMenuRepository.findOne(id);
                return resultFindOne;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    update(id, updateSubMenuDto) {
        return `This action updates a #${id} subMenu`;
    }
    remove(id) {
        return `This action removes a #${id} subMenu`;
    }
};
SubMenuService = SubMenuService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sub_menu_repository_1.SubMenuRepository])
], SubMenuService);
exports.SubMenuService = SubMenuService;
//# sourceMappingURL=sub-menu.service.js.map