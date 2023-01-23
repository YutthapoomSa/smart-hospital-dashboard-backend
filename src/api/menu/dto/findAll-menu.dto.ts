import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MenuDB } from 'src/database/entity/menu.entity';
import { ResStatus } from 'src/shared/enum/res-status.enum';
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
                _data.menu_id = iterator.menu_id;
                _data.menu_name = iterator.menu_name;
                _data.menu_icon = iterator.menu_icon;
                _data.url = iterator.url;
                this.resData.push(_data);
            }
        }
    }
}
