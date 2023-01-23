import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
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
    submenuId: number;

    @Column({
        allowNull: false,
    })
    submenuName: string;

    @Column({
        allowNull: true,
    })
    submenuIcon: string;

    @Column({
        allowNull: false,
    })
    url: string;

    // @Column({
    //     type: DataType.DATE(),
    //     defaultValue: () => Date.now(),
    //     allowNull: false,
    // })
    // @CreatedAt
    // readonly createdAt?: Date;

    // @Column({
    //     type: DataType.DATE(),
    //     defaultValue: () => Date.now(),
    //     allowNull: false,
    // })
    // @UpdatedAt
    // readonly updatedAt?: Date;
    // ─────────────────────────────────────────────────────────────────────

    @ForeignKey(() => MenuDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    menuId: number;

    @BelongsTo(() => MenuDB)
    menuLists: MenuDB;

    //     @BelongsTo(() => MenuDB)

    //     menu: MenuDB;
}
