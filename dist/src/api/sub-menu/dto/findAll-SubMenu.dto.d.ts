import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
export declare class FindAllSubMenuResDTOData {
    submenu_id: number;
    submenu_name: string;
    submenu_icon: string;
    url: string;
    menuLists: MenuListDTO[];
}
export declare class MenuListDTO {
    menu_id: number;
    menu_name: string;
    menu_icon: string;
    url: string;
}
export declare class FindAllSubMenuResDTO {
    resCode: ResStatus;
    resData: FindAllSubMenuResDTOData[];
    msg: string;
    constructor(resCode: ResStatus, msg: string, datas: SubMenuDB[]);
}
