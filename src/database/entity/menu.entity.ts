import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
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
        primaryKey: true,
    })
    menu_id: number;

    @Column({
        allowNull: false,
    })
    menu_name: string;

    @Column({
        allowNull: true,
    })
    menu_icon: string;

    @Column({
        allowNull: true,
        comment: ' link url หน้า main',
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

    @HasMany(() => SubMenuDB)
    subMenuLists: SubMenuDB[];
}
