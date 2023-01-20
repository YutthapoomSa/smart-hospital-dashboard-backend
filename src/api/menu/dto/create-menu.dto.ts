import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MenuDB } from 'src/database/entity/menu.entity';
import { ResStatus } from 'src/shared/enum/res-status.enum';

export class CreateMenuDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    menu_name: string;

    @ApiProperty()
    @IsString()
    url: string;
}

export class CreateMenuResDTOData {
    @ApiProperty()
    menu_id: number;
    @ApiProperty()
    menu_name: string;
    @ApiProperty()
    url: string;
}

export class CreateMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateMenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateMenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateMenuResDTOData();

        if (!!datas) {
            this.resData.menu_id = datas.menu_id;
            this.resData.menu_name = datas.menu_name;
            this.resData.url = datas.url;
        }
    }
}
