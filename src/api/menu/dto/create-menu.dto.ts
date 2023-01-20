import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class CreateMenuDTO {
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

export class CreateMenuResDTOData {
    @ApiProperty()
    menu_id: number;
    @ApiProperty()
    menu_name: string;
    @ApiProperty()
    menu_icon: string;
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
            this.resData.menu_icon = datas.menu_icon;
            this.resData.url = datas.url;
        }
    }
}
