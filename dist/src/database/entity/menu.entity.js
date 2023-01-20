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
exports.MenuDB = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sub_menu_entity_1 = require("./sub-menu.entity");
let MenuDB = class MenuDB extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: 'unique_menu_id',
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], MenuDB.prototype, "menu_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
    }),
    __metadata("design:type", String)
], MenuDB.prototype, "menu_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
    }),
    __metadata("design:type", String)
], MenuDB.prototype, "menu_icon", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        comment: ' link url หน้า main',
    }),
    __metadata("design:type", String)
], MenuDB.prototype, "url", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => sub_menu_entity_1.SubMenuDB),
    __metadata("design:type", Array)
], MenuDB.prototype, "subMenuLists", void 0);
MenuDB = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'menu',
        comment: 'เมนูหลัก',
    })
], MenuDB);
exports.MenuDB = MenuDB;
//# sourceMappingURL=menu.entity.js.map