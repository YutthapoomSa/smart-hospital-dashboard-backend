import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { CreateSubmenuResDTOData } from './create-sub-menu.dto';

export class UpdateSubMenuDTO {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    submenuId: number;

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
}

export class UpdateSubMenuResDTOData extends PartialType(CreateSubmenuResDTOData) {}

export class UpdateSubMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateSubMenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: UpdateSubMenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: SubMenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateSubMenuResDTOData();

        if (!!datas) {
            this.resData.submenuId = datas.submenuId;
            this.resData.submenuName = datas.submenuName;
            this.resData.submenuIcon = datas.submenuIcon;
            this.resData.iframe = datas.iframe;
            this.resData.link = datas.link;
            this.resData.page = datas.page;
        }
    }
}
