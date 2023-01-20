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
exports.UserPasswordDB = void 0;
const class_validator_1 = require("class-validator");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("./user.entity");
let UserPasswordDB = class UserPasswordDB extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: 'uq_user_pass_id',
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], UserPasswordDB.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        comment: 'password hash',
    }),
    (0, class_validator_1.IsHash)('sha512'),
    __metadata("design:type", String)
], UserPasswordDB.prototype, "hashPassword", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], UserPasswordDB.prototype, "isResetProgress", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        defaultValue: null,
    }),
    __metadata("design:type", String)
], UserPasswordDB.prototype, "resetCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        defaultValue: null,
    }),
    __metadata("design:type", Date)
], UserPasswordDB.prototype, "resetExpires", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], UserPasswordDB.prototype, "activate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.UserDB),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], UserPasswordDB.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.UserDB),
    __metadata("design:type", user_entity_1.UserDB)
], UserPasswordDB.prototype, "user", void 0);
UserPasswordDB = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user_password',
    })
], UserPasswordDB);
exports.UserPasswordDB = UserPasswordDB;
//# sourceMappingURL=user-password.entity.js.map