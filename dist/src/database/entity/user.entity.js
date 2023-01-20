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
exports.UserDB = exports.UserDBGender = exports.UserDBRole = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_password_entity_1 = require("./user-password.entity");
const user_socket_entity_1 = require("./user-socket.entity");
var UserDBRole;
(function (UserDBRole) {
    UserDBRole["admin"] = "admin";
    UserDBRole["user"] = "user";
})(UserDBRole = exports.UserDBRole || (exports.UserDBRole = {}));
var UserDBGender;
(function (UserDBGender) {
    UserDBGender["male"] = "male";
    UserDBGender["female"] = "female";
    UserDBGender["other"] = "other";
})(UserDBGender = exports.UserDBGender || (exports.UserDBGender = {}));
let UserDB = class UserDB extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: 'unique_user_id',
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], UserDB.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserDB.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserDB.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserDB.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserDB.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserDB.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_typescript_1.DataType.ENUM(UserDBRole.admin, UserDBRole.user),
        comment: 'สิทธิ์การเข้าใช้งาน',
        defaultValue: UserDBRole.user,
    }),
    __metadata("design:type", String)
], UserDB.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        comment: 'status เปิด ปิด',
        defaultValue: true,
        allowNull: false,
    }),
    __metadata("design:type", Boolean)
], UserDB.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
    }),
    __metadata("design:type", String)
], UserDB.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.ENUM(UserDBGender.male, UserDBGender.female, UserDBGender.other),
        comment: 'เพศ',
    }),
    __metadata("design:type", String)
], UserDB.prototype, "gender", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT(),
        defaultValue: null,
        allowNull: true,
    }),
    __metadata("design:type", String)
], UserDB.prototype, "phoneNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_socket_entity_1.UserSocketDB),
    __metadata("design:type", Array)
], UserDB.prototype, "userSocketLists", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_password_entity_1.UserPasswordDB),
    __metadata("design:type", Array)
], UserDB.prototype, "userPasswordLists", void 0);
UserDB = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user',
        comment: 'ตารางข้อมูล user',
    })
], UserDB);
exports.UserDB = UserDB;
//# sourceMappingURL=user.entity.js.map