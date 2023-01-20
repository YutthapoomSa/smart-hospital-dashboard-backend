import { Model } from 'sequelize-typescript';
import { SubMenuDB } from './sub-menu.entity';
export declare class MenuDB extends Model<MenuDB> {
    menu_id: number;
    menu_name: string;
    menu_icon: string;
    url: string;
    subMenuLists: SubMenuDB[];
    length: number;
}
