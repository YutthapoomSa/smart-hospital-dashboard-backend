import { ApiProperty } from '@nestjs/swagger';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class FindOneMenuResDTOData {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
    @ApiProperty()
    iframe: string;
    @ApiProperty()
    submenuId: number;
}

export class FindOneMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => FindOneMenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: FindOneMenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new FindOneMenuResDTOData();

        if (!!datas) {
            this.resData.menuId = datas.menuId;
            this.resData.menuName = datas.menuName;
            this.resData.iframe = datas.iframe;
            this.resData.submenuId = datas.submenuId;
        }
    }
}
