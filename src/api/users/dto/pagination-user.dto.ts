import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import moment from 'moment';
import { DataType } from 'sequelize-typescript';
import { UserDB } from './../../../database/entity/user.entity';
import { config } from './../../../../config/config.development';
import { UserDBGender, UserDBRole } from './../../../database/entity/user.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class UserPaginationDTO {
    @ApiProperty({
        example: '10',
    })
    @IsNotEmpty()
    @IsNumber()
    perPages: number;

    @ApiProperty({
        example: '1',
    })
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @ApiProperty({
        example: '',
    })
    @IsString()
    search: string;
}

export class UserPaginationResDTOResDatas {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        type: DataType.ENUM({
            values: Object.keys(UserDBRole).map((k) => UserDBRole[k]),
        }),
    })
    role: string;

    @ApiProperty()
    @IsBoolean()
    status: boolean;

    @ApiProperty()
    image: string;

    @ApiProperty({
        type: DataType.ENUM({
            values: Object.keys(UserDBGender).map((k) => UserDBGender[k]),
        }),
    })
    gender: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    createdAt: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    updatedAt: string;
}
export class UserPaginationResDTOResData {
    @ApiProperty()
    totalItems: number;

    @ApiProperty()
    itemsPerPage: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    currentPage: number;

    @ApiProperty({
        type: () => [UserPaginationResDTOResDatas],
    })
    datas: UserPaginationResDTOResDatas[];
}

export class UserPaginationResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UserPaginationResDTOResData,
        description: 'ข้อมูล',
    })
    resData: UserPaginationResDTOResData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(
        resStatus: ResStatus,
        msg: string,
        data: UserDB[],
        totalItems: number,
        itemsPerPage: number,
        totalPages: number,
        currentPage: number,
    ) {
        this.resCode = resStatus;
        this.msg = msg;

        const _resData = new UserPaginationResDTOResData();
        _resData.itemsPerPage = itemsPerPage;
        _resData.totalItems = totalItems;
        _resData.currentPage = currentPage;
        _resData.totalPages = totalPages;
        _resData.datas = [];

        for (const item of data) {
            const _data = new UserPaginationResDTOResDatas();
            _data.id = item.id;
            _data.email = item.email;
            _data.username = item.username;
            // _data.password = item.password;
            _data.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
            _data.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss');
            _data.gender = item.gender;
            _data.role = item.role;
            _data.status = item.status;
            _data.image = item.image ? config.imagePath.userImagePath + '/' + item.image : '';
            _data.phoneNumber = item.phoneNumber;
            _data.firstName = item.firstName;
            _data.lastName = item.lastName;

            _resData.datas.push(_data);
        }
        this.resData = _resData;
    }
}
