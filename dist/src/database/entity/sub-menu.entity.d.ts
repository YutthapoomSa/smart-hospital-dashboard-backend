import { Model } from 'sequelize-typescript';
import { MenuDB } from './menu.entity';
export declare class SubMenuDB extends Model<SubMenuDB> {
    submenu_id: number;
    submenu_name: string;
    submenu_icon: string;
    url: string;
    menu_id: number;
    menuLists: MenuDB[];
}
