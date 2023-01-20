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
exports.CreateMenuResDTO = exports.CreateMenuResDTOData = exports.CreateMenuDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const res_status_enum_1 = require("./../../../shared/enum/res-status.enum");
class CreateMenuDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMenuDTO.prototype, "menu_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMenuDTO.prototype, "menu_icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMenuDTO.prototype, "url", void 0);
exports.CreateMenuDTO = CreateMenuDTO;
class CreateMenuResDTOData {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateMenuResDTOData.prototype, "menu_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateMenuResDTOData.prototype, "menu_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateMenuResDTOData.prototype, "menu_icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateMenuResDTOData.prototype, "url", void 0);
exports.CreateMenuResDTOData = CreateMenuResDTOData;
class CreateMenuResDTO {
    constructor(resCode, msg, datas) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateMenuResDTOData();
        if (!!datas) {
            this.resData.menu_id = datas.menu_id;
            this.resData.menu_name = datas.menu_name;
            this.resData.menu_icon = datas.menu_icon;
            this.resData.url = datas.url;
        }
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Object.keys(res_status_enum_1.ResStatus).map((k) => res_status_enum_1.ResStatus[k]),
        description: 'รหัสสถานะ',
    }),
    __metadata("design:type", String)
], CreateMenuResDTO.prototype, "resCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => CreateMenuResDTOData,
        description: 'ข้อมูล',
    }),
    __metadata("design:type", CreateMenuResDTOData)
], CreateMenuResDTO.prototype, "resData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ข้อความอธิบาย',
    }),
    __metadata("design:type", String)
], CreateMenuResDTO.prototype, "msg", void 0);
exports.CreateMenuResDTO = CreateMenuResDTO;
//# sourceMappingURL=create-menu.dto.js.map