import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { MenuDB } from 'src/database/entity/menu.entity';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { CreateMenuDTO } from './create-menu.dto';

export class UpdateMenuDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    menu_name: string;

    @ApiProperty()
    @IsString()
    menu_icon: string;

    @ApiProperty()
    @IsString()
    url: string;
}

export class UpdateMenuResDTOData {
    @ApiProperty()
    menu_id: number;
    @ApiProperty()
    menu_name: string;
    @ApiProperty()
    menu_icon: string;
    @ApiProperty()
    url: string;
}

export class UpdateMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateMenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: UpdateMenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateMenuResDTOData();

        if (!!datas) {
            this.resData.menu_id = datas.menu_id;
            this.resData.menu_name = datas.menu_name;
            this.resData.menu_icon = datas.menu_icon;
            this.resData.url = datas.url;
        }
    }
}
