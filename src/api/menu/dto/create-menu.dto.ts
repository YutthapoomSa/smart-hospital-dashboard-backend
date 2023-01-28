import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { IsNumber } from 'class-validator';

export class CreateMenuDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    menuName: string;

    @ApiProperty()
    @IsString()
    iframe: string;

    @ApiProperty()
    @IsNumber()
    submenuId: number;
}

export class CreateMenuResDTOData {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
    @ApiProperty()
    iframe: string;
    @ApiProperty()
    submenuId: number;
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
            this.resData.menuId = datas.menuId;
            this.resData.menuName = datas.menuName;
            this.resData.iframe = datas.iframe;
            this.resData.submenuId = datas.submenuId;
        }
    }
}
