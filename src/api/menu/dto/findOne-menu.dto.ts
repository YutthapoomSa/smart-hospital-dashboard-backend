import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { UpdateMenuResDTOData } from './update-menu.dto';

export class FindOneMenuResDTOData extends PartialType(UpdateMenuResDTOData) { }

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
            this.resData.menuIcon = datas.menuIcon;
            this.resData.url = datas.url;
        }
    }
}
