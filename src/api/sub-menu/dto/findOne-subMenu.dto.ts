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

            if (!!this.resData.menuLists && this.resData.menuLists.length > 0)
                for (const iterator2 of this.resData.menuLists) {
                    const _data2 = new MenuListDTO();
                    _data2.menu_id = iterator2.menu_id;
                    _data2.menu_name = iterator2.menu_name;
                    console.log(JSON.stringify(_data2, null, 2));

                    this.resData.menuLists.push(iterator2);
                }
        }
    }
}
