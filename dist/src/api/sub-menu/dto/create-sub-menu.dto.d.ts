import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
export declare class CreateSubMenuReqDTO {
    submenu_name: string;
    submenu_icon: string;
    url: string;
    menu_id: number;
}
export declare class CreateSubmenuResDTOData {
    submenu_id: number;
    submenu_name: string;
    submenu_icon: string;
    url: string;
    menu_id: number;
}
export declare class CreateMenuResDTO {
    resCode: ResStatus;
    resData: CreateSubmenuResDTOData;
    msg: string;
    constructor(resCode: ResStatus, msg: string, datas: SubMenuDB);
}
