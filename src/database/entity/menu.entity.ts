import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
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
    id: number;

    @Column({
        allowNull: false,
    })
    menuName: string;

    @Column({
        allowNull: false,
    })
    icon: string;

    @Column({
        allowNull: true,
        comment: 'link url iframe',
    })
    iframeMenu: string;

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
    SubMenuLists: SubMenuDB[];
}
