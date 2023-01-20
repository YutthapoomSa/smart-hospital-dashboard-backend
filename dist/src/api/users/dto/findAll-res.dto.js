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
exports.FindAllResDTO = exports.Option = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./../../../database/entity/user.entity");
class FindAllResDTOResData {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAllResDTOResData.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ข้อมูล',
    }),
    __metadata("design:type", String)
], FindAllResDTOResData.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAllResDTOResData.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAllResDTOResData.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'สิทธิ์การเข้าใช้งาน',
    }),
    __metadata("design:type", String)
], FindAllResDTOResData.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'status เปิด ปิด',
    }),
    __metadata("design:type", Boolean)
], FindAllResDTOResData.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'เพศ',
    }),
    __metadata("design:type", String)
], FindAllResDTOResData.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAllResDTOResData.prototype, "phoneNumber", void 0);
class Option {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Option.prototype, "search", void 0);
exports.Option = Option;
class FindAllResDTO {
    constructor(resData, datas) {
        this.totalItems = resData.totalItems;
        this.itemsPerPage = resData.itemsPerPage;
        this.totalPages = resData.totalPages;
        this.currentPage = resData.currentPage;
        this.option = resData.option;
        this.datas = [];
        if (!!datas) {
            const _data = new FindAllResDTOResData();
            _data.email = datas.email;
            _data.userName = datas.username;
            _data.firstName = datas.firstName;
            _data.lastName = datas.lastName;
            _data.role = datas.role;
            _data.status = datas.status;
            _data.gender = datas.gender;
            _data.phoneNumber = datas.phoneNumber;
        }
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindAllResDTO.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindAllResDTO.prototype, "itemsPerPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindAllResDTO.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindAllResDTO.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Option)
], FindAllResDTO.prototype, "option", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [FindAllResDTOResData],
    }),
    __metadata("design:type", Array)
], FindAllResDTO.prototype, "datas", void 0);
exports.FindAllResDTO = FindAllResDTO;
//# sourceMappingURL=findAll-res.dto.js.map