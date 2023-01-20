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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResDTO = exports.UserLoginRefreshToKenReqDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const res_status_enum_1 = require("src/shared/enum/res-status.enum");
moment_timezone_1.default.tz.setDefault('Asia/Bangkok');
class UserLoginRefreshToKenReqDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserLoginRefreshToKenReqDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserLoginRefreshToKenReqDto.prototype, "refreshToken", void 0);
exports.UserLoginRefreshToKenReqDto = UserLoginRefreshToKenReqDto;
class UserLoginRefreshToKenResData {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserLoginRefreshToKenResData.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserLoginRefreshToKenResData.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserLoginRefreshToKenResData.prototype, "expire", void 0);
class LoginResDTO {
    constructor(resCode, msg, _accessToken, _refreshToken, _expire) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UserLoginRefreshToKenResData();
        this.resData.accessToken = null;
        this.resData.refreshToken = null;
        this.resData.expire = null;
        if (_accessToken != null) {
            this.resData.accessToken = _accessToken;
        }
        if (_refreshToken != null) {
            this.resData.refreshToken = _refreshToken;
        }
        if (_expire != null) {
            this.resData.expire = (0, moment_timezone_1.default)(_expire).format('YYYY-MM-DD HH:mm:ss');
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
        type: () => UserLoginRefreshToKenResData,
        description: 'ข้อมูล',
    }),
    __metadata("design:type", UserLoginRefreshToKenResData)
], LoginResDTO.prototype, "resData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ข้อความอธิบาย',
    }),
    __metadata("design:type", String)
], LoginResDTO.prototype, "msg", void 0);
exports.LoginResDTO = LoginResDTO;
//# sourceMappingURL=user-login-refreshToken.dto.js.map