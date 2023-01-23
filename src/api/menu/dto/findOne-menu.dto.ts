import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MenuDB } from 'src/database/entity/menu.entity';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { UpdateMenuResDTOData } from './update-menu.dto';

export class FindOneMenuResDTOData extends PartialType(UpdateMenuResDTOData) {}

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
            this.resData.menu_id = datas.menu_id;
            this.resData.menu_name = datas.menu_name;
            this.resData.menu_icon = datas.menu_icon;
            this.resData.url = datas.url;
        }
    }
}
