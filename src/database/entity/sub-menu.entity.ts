import { Table, Column, DataType, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, Model } from 'sequelize-typescript';
import { MenuDB } from './menu.entity';

@Table({
    tableName: 'sub_menu',
    comment: 'ตารางข้อมูล เมนูย่อย',
})
export class SubMenuDB extends Model<SubMenuDB> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: 'unique_sub_menu_id',
        primaryKey: true,
    })
    submenu_id: number;

    @Column({
        allowNull: false,
    })
    submenu_name: string;

    @Column({
        allowNull: false,
    })
    url: string;

    @CreatedAt
    readonly createdAt?: Date;

    @UpdatedAt
    readonly updatedAt?: Date;
    // ─────────────────────────────────────────────────────────────────────

    @ForeignKey(() => MenuDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: 'menu_id',
    })
    menu_id: number;

    @BelongsTo(() => MenuDB)
    user: MenuDB;
}
