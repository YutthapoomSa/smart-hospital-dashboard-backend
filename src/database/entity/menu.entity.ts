import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { SubMenuDB } from './sub-menu.entity';

@Table({
    tableName: 'menu',
    comment: 'เมนูหลัก',
})
export class MenuDB extends Model<MenuDB> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: 'unique_menu_id',
        primaryKey: true,
    })
    menu_id: number;

    @Column({
        allowNull: false,
    })
    menu_name: string;

    @Column({
        allowNull: true,
        comment: ' link url หน้า main',
    })
    url: string;

    @CreatedAt
    readonly createdAt?: Date;

    @UpdatedAt
    readonly updatedAt?: Date;
    // ─────────────────────────────────────────────────────────────────────

    @HasMany(() => SubMenuDB)
    subMenuLists: SubMenuDB[];
}
