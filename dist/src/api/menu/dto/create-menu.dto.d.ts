import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
export declare class CreateMenuDTO {
    menu_name: string;
    menu_icon: string;
    url: string;
}
export declare class CreateMenuResDTOData {
    menu_id: number;
    menu_name: string;
    menu_icon: string;
    url: string;
}
export declare class CreateMenuResDTO {
    resCode: ResStatus;
    resData: CreateMenuResDTOData;
    msg: string;
    constructor(resCode: ResStatus, msg: string, datas: MenuDB);
}
