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
exports.FindOneUserResDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../database/entity/user.entity");
const res_status_enum_1 = require("./../../../shared/enum/res-status.enum");
class FindOneUserResDTOResData {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindOneUserResDTOResData.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ข้อมูล',
    }),
    __metadata("design:type", String)
], FindOneUserResDTOResData.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindOneUserResDTOResData.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindOneUserResDTOResData.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'สิทธิ์การเข้าใช้งาน',
    }),
    __metadata("design:type", String)
], FindOneUserResDTOResData.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'status เปิด ปิด',
    }),
    __metadata("design:type", Boolean)
], FindOneUserResDTOResData.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'เพศ',
    }),
    __metadata("design:type", String)
], FindOneUserResDTOResData.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindOneUserResDTOResData.prototype, "phoneNumber", void 0);
class FindOneUserResDTO {
    constructor(resCode, msg, datas) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new FindOneUserResDTOResData();
        if (!!datas) {
            this.resData.email = datas.email;
            this.resData.userName = datas.username;
            this.resData.firstName = datas.firstName;
            this.resData.lastName = datas.lastName;
            this.resData.role = datas.role;
            this.resData.status = datas.status;
            this.resData.gender = datas.gender;
            this.resData.phoneNumber = datas.phoneNumber;
        }
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Object.keys(res_status_enum_1.ResStatus).map((k) => res_status_enum_1.ResStatus[k]),
        description: 'รหัสสถานะ',
    }),
    __metadata("design:type", String)
], FindOneUserResDTO.prototype, "resCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => FindOneUserResDTOResData,
        description: 'ข้อมูล',
    }),
    __metadata("design:type", FindOneUserResDTOResData)
], FindOneUserResDTO.prototype, "resData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ข้อความอธิบาย',
    }),
    __metadata("design:type", String)
], FindOneUserResDTO.prototype, "msg", void 0);
exports.FindOneUserResDTO = FindOneUserResDTO;
//# sourceMappingURL=find-one-user-res.dto.js.map