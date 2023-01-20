import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class CreateSubMenuReqDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    submenu_name: string;

    @ApiProperty()
    @IsString()
    submenu_icon: string;

    @ApiProperty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    menu_id: number;
}

export class CreateSubmenuResDTOData {
    @ApiProperty()
    submenu_id: number;
    @ApiProperty()
    submenu_name: string;
    @ApiProperty()
    submenu_icon: string;
    @ApiProperty()
    url: string;
    @ApiProperty()
    menu_id: number;
}

export class CreateMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateSubmenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateSubmenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: SubMenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateSubmenuResDTOData();

        if (!!datas) {
            this.resData.submenu_id = datas.submenu_id;
            this.resData.submenu_name = datas.submenu_name;
            this.resData.submenu_icon = datas.submenu_icon;
            this.resData.url = datas.url;
            this.resData.menu_id = datas.menu_id;
        }
    }
}
