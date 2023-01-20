import { ApiProperty } from '@nestjs/swagger';
import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class FindAllSubMenuResDTOData {
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

export class MenuListDTO {
    @ApiProperty()
    menu_id: number;
    @ApiProperty()
    menu_name: string;
    @ApiProperty()
    menu_icon: string;
    @ApiProperty()
    url: string;
}

export class FindAllSubMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [FindAllSubMenuResDTOData],
        description: 'ข้อมูล',
    })
    resData: FindAllSubMenuResDTOData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: SubMenuDB[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];
        // const config = new ConfigService();

        if (!!datas && datas.length > 0) {
            for (const iterator of datas) {
                const _data = new FindAllSubMenuResDTOData();
                _data.submenu_id = iterator.submenu_id;
                _data.submenu_name = iterator.submenu_name;
                _data.submenu_icon = iterator.submenu_icon;
                _data.url = iterator.url;
                _data.menuLists = [];

                if (!!iterator.menuLists && iterator.menuLists.length > 0) {
                    for (const iterator2 of iterator.menuLists) {
                        const _menu = new MenuListDTO();
                        _menu.menu_id = iterator2.menu_id;
                        _menu.menu_name = iterator2.menu_name;
                        _menu.menu_icon = iterator2.menu_icon;
                        _menu.url = iterator2.url;
                        _data.menuLists.push(_menu);
                    }
                }
                this.resData.push(_data);
            }
        }
    }
}
