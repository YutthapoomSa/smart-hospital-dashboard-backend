import { ApiProperty } from '@nestjs/swagger';
import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class MenuListDTO {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
}

export class FindAllSubMenuResDTOData {
    @ApiProperty()
    submenuId: number;
    @ApiProperty()
    submenuName: string;
    @ApiProperty()
    submenuIcon: string;
    @ApiProperty()
    url: string;
    @ApiProperty()
    menuId: number;
    @ApiProperty({
        type: () => [MenuListDTO],
    })
    menuLists: MenuListDTO[];
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

        if (!!datas) {
            for (const iterator of datas) {
                const _data = new FindAllSubMenuResDTOData();
                _data.submenuId = iterator.submenuId;
                _data.submenuName = iterator.submenuName;
                _data.submenuIcon = iterator.submenuIcon;
                _data.url = iterator.url;
                _data.menuId = iterator.menuId;
                _data.menuLists = [];

                if (!!iterator.menuLists) {
                    const _menu = new MenuListDTO();
                    _menu.menuId = iterator.menuLists.menuId;
                    _menu.menuName = iterator.menuLists.menuName;
                    _data.menuLists.push(_menu);
                }
                this.resData.push(_data);
            }
        }
    }
}
