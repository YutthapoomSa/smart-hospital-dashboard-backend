import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserDB, UserDBRole } from 'src/database/entity/user.entity';
import { ResStatus } from 'src/shared/enum/res-status.enum';

export class UpdateUserDto {
    @ApiProperty()
    @IsNumber()
    userId?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    phoneNumber: string;

    @ApiProperty({
        enum: Object.keys(UserDBRole).map((k) => UserDBRole[k]),
    })
    @IsEnum(UserDBRole)
    role?: UserDBRole;
}

// ─────────────────────────────────────────────────────────────────────────────

class UpdateUserResDTOResData {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    phoneNumber: string;
}

export class UpdateUserResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateUserResDTOResData,
        description: 'ข้อมูล',
    })
    resData: UpdateUserResDTOResData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: UserDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateUserResDTOResData();
        if (!!datas) {
            this.resData.id = datas.id;
            this.resData.username = datas.username;
            this.resData.email = datas.email;
            this.resData.firstName = datas.firstName;
            this.resData.lastName = datas.lastName;
            this.resData.phoneNumber = datas.phoneNumber;
        }
    }
}
