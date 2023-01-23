import { ApiProperty } from '@nestjs/swagger';
import { SubMenuDB } from 'src/database/entity/sub-menu.entity';
import { ResStatus } from 'src/shared/enum/res-status.enum';

export class MenuListDTO {
    @ApiProperty()
    menu_id: number;
    @ApiProperty()
    menu_name: string;
}

export class FindOneSubMenuResDTOData {
    @ApiProperty()
    submenu_id: number;
    @ApiProperty()
    submenu_name: string;
    @ApiProperty()
    submenu_icon: string;
    @ApiProperty()
    url: string;
    @ApiProperty({
        type: () => [MenuListDTO],
    })
    menuLists: MenuListDTO[];
}

export class FindOneMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => FindOneSubMenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: FindOneSubMenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: SubMenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new FindOneSubMenuResDTOData();

        if (!!datas) {
            this.resData.submenu_id = datas.submenu_id;
            this.resData.submenu_name = datas.submenu_name;
            this.resData.submenu_icon = datas.submenu_icon;
            this.resData.url = datas.url;
            this.resData.menuLists = [];

            if (!!datas.menuLists) {

                const _data2 = new MenuListDTO();
                _data2.menu_id = datas.menuLists.menu_id;
                _data2.menu_name = datas.menuLists.menu_name;
                this.resData.menuLists.push(_data2);
            }
        }
    }
}
