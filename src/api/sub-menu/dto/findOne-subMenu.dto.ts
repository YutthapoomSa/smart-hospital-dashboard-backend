import { ApiProperty } from '@nestjs/swagger';
import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class MenuListDTO {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
}

export class FindOneSubMenuResDTOData {
    @ApiProperty()
    submenuId: number;
    @ApiProperty()
    submenuName: string;
    @ApiProperty()
    iframe: string;
    @ApiProperty()
    link: string;
    @ApiProperty()
    page: string;
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
            this.resData.submenuId = datas.submenuId;
            this.resData.submenuName = datas.submenuName;
            this.resData.iframe = datas.iframe;
            this.resData.link = datas.link;
            this.resData.page = datas.page;
            this.resData.menuLists = [];

            if (!!datas.menuLists) {
                const _data2 = new MenuListDTO();
                _data2.menuId = datas.menuLists.menuId;
                _data2.menuName = datas.menuLists.menuName;
                this.resData.menuLists.push(_data2);
            }
        }
    }
}
