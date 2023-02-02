import { ApiProperty } from '@nestjs/swagger';
import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';


export class FindOneSubMenuResDTOData {
    @ApiProperty()
    submenuId: number;
    @ApiProperty()
    submenuName: string;
    @ApiProperty()
    submenuIcon: string;
    @ApiProperty()
    iframe: string;
    @ApiProperty()
    link: string;
    @ApiProperty()
    page: string;
    @ApiProperty()
    menuId: number[];
}
export class FindOneSubMenuResDTO {
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
            this.resData.submenuId = datas.id;
            this.resData.submenuName = datas.submenuName;
            this.resData.submenuIcon = datas.submenuIcon;
            this.resData.iframe = datas.iframe;
            this.resData.link = datas.link;
            this.resData.page = datas.page;
            this.resData.menuId = [];
            for (const iterator of datas.menuId) {
                this.resData.menuId.push(iterator);
            }
        }
    }
}
