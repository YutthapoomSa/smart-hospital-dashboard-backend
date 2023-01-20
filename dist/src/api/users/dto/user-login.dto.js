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
exports.LoginResDTO = exports.UserLoginRequestDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const res_status_enum_1 = require("./../../../shared/enum/res-status.enum");
class UserLoginRequestDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserLoginRequestDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserLoginRequestDTO.prototype, "password", void 0);
exports.UserLoginRequestDTO = UserLoginRequestDTO;
class LoginResDTOResData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ชื่อ',
    }),
    __metadata("design:type", String)
], LoginResDTOResData.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginResDTOResData.prototype, "password", void 0);
class LoginResDTO {
    constructor(resCode, msg, _username, _password) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new LoginResDTOResData();
        this.resData.username = null;
        this.resData.password = null;
        if (_username != null) {
            this.resData.username = _username;
        }
        if (_password != null) {
            this.resData.password = _password;
        }
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Object.keys(res_status_enum_1.ResStatus).map((k) => res_status_enum_1.ResStatus[k]),
        description: 'รหัสสถานะ',
    }),
    __metadata("design:type", String)
], LoginResDTO.prototype, "resCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => LoginResDTOResData,
        description: 'ข้อมูล',
    }),
    __metadata("design:type", LoginResDTOResData)
], LoginResDTO.prototype, "resData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ข้อความอธิบาย',
    }),
    __metadata("design:type", String)
], LoginResDTO.prototype, "msg", void 0);
exports.LoginResDTO = LoginResDTO;
//# sourceMappingURL=user-login.dto.js.map