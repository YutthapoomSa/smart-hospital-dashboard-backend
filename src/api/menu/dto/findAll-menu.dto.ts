import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { UpdateMenuResDTOData } from './update-menu.dto';

export class FindAllMenuResDTOData extends PartialType(UpdateMenuResDTOData) {}

export class FindAllMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [FindAllMenuResDTOData],
        description: 'ข้อมูล',
    })
    resData: FindAllMenuResDTOData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];

        if (!!datas && datas.length > 0) {
            for (const iterator of datas) {
                const _data = new FindAllMenuResDTOData();
                _data.menuId = iterator.menuId;
                _data.menuName = iterator.menuName;
                _data.menuIcon = iterator.menuIcon;
                this.resData.push(_data);
            }
        }
    }
}
