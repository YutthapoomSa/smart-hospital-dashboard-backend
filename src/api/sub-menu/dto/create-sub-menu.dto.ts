import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class CreateSubMenuReqDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    submenuName: string;

    @ApiProperty()
    @IsString()
    submenuIcon: string;

    @ApiProperty()
    @IsString()
    iframe: string;

    @ApiProperty()
    @IsString()
    link: string;

    @ApiProperty()
    @IsString()
    page: string;

    @ApiProperty()
    @IsNumber()
    menuId: number;
}
// ─────────────────────────────────────────────────────────────────────────────
export class CreateSubmenuResDTOData {
    @ApiProperty()
    submenuId: number;
    @ApiProperty()
    submenuName: string;
    @ApiProperty()
    submenuIcon: string;
    @ApiProperty()
    iframe: string;
    @ApiProperty()
    link: string;
    @ApiProperty()
    page: string;
    @ApiProperty()
    menuId: number;
}

export class CreateSubMenuResDTO {
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
            this.resData.submenuId = datas.id;
            this.resData.submenuName = datas.submenuName;
            this.resData.submenuIcon = datas.submenuIcon;
            this.resData.iframe = datas.iframe;
            this.resData.link = datas.link;
            this.resData.page = datas.page;
            this.resData.menuId = datas.menuId
        }
    }
}
