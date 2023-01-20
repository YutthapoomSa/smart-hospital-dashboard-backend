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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllSubMenuResDTO = exports.MenuListDTO = exports.FindAllSubMenuResDTOData = void 0;
const swagger_1 = require("@nestjs/swagger");
const res_status_enum_1 = require("./../../../shared/enum/res-status.enum");
class FindAllSubMenuResDTOData {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindAllSubMenuResDTOData.prototype, "submenu_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAllSubMenuResDTOData.prototype, "submenu_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAllSubMenuResDTOData.prototype, "submenu_icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAllSubMenuResDTOData.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [MenuListDTO],
    }),
    __metadata("design:type", Array)
], FindAllSubMenuResDTOData.prototype, "menuLists", void 0);
exports.FindAllSubMenuResDTOData = FindAllSubMenuResDTOData;
class MenuListDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MenuListDTO.prototype, "menu_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MenuListDTO.prototype, "menu_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MenuListDTO.prototype, "menu_icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MenuListDTO.prototype, "url", void 0);
exports.MenuListDTO = MenuListDTO;
class FindAllSubMenuResDTO {
    constructor(resCode, msg, datas) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];
        if (!!datas && datas.length > 0) {
            for (const iterator of datas) {
                const _data = new FindAllSubMenuResDTOData();
                _data.submenu_id = iterator.submenu_id;
                _data.submenu_name = iterator.submenu_name;
                _data.submenu_icon = iterator.submenu_icon;
                _data.url = iterator.url;
                _data.menuLists = [];
                if (!!iterator.menuLists && iterator.menuLists.length > 0) {
                    for (const iterator2 of iterator.menuLists) {
                        const _menu = new MenuListDTO();
                        _menu.menu_id = iterator2.menu_id;
                        _menu.menu_name = iterator2.menu_name;
                        _menu.menu_icon = iterator2.menu_icon;
                        _menu.url = iterator2.url;
                        _data.menuLists.push(_menu);
                    }
                }
                this.resData.push(_data);
            }
        }
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Object.keys(res_status_enum_1.ResStatus).map((k) => res_status_enum_1.ResStatus[k]),
        description: 'รหัสสถานะ',
    }),
    __metadata("design:type", String)
], FindAllSubMenuResDTO.prototype, "resCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [FindAllSubMenuResDTOData],
        description: 'ข้อมูล',
    }),
    __metadata("design:type", Array)
], FindAllSubMenuResDTO.prototype, "resData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ข้อความอธิบาย',
    }),
    __metadata("design:type", String)
], FindAllSubMenuResDTO.prototype, "msg", void 0);
exports.FindAllSubMenuResDTO = FindAllSubMenuResDTO;
//# sourceMappingURL=findAll-SubMenu.dto.js.map