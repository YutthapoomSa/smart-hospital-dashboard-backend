import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { UserDB, UserDBGender, UserDBRole } from '../../../database/entity/user.entity';

export class CreateUserReqDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

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

    @ApiProperty({
        enum: Object.keys(UserDBGender).map((k) => UserDBGender[k]),
    })
    @IsEnum(UserDBGender)
    gender: UserDBGender;

    @ApiProperty()
    @IsString()
    phoneNumber: string;
    
    @ApiProperty()
    @IsString()
    image: string;

    @ApiProperty({
        enum: Object.keys(UserDBRole).map((k) => UserDBRole[k]),
    })
    @IsEnum(UserDBRole)
    @IsNotEmpty()
    role: UserDBRole;
}

// ─────────────────────────────────────────────────────────────────────────────

class CreateUserResDTOResData {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    phoneNumber: string;
    
    @ApiProperty()
    image: string;

    @ApiProperty()
    gender: UserDBGender;

    @ApiProperty()
    role: UserDBRole;
}

export class CreateUserResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateUserResDTOResData,
        description: 'ข้อมูล',
    })
    resData: CreateUserResDTOResData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: UserDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateUserResDTOResData();
        if (!!datas) {
            this.resData.id = datas.id;
            this.resData.email = datas.email;
            this.resData.firstName = datas.firstName;
            this.resData.lastName = datas.lastName;
            this.resData.phoneNumber = datas.phoneNumber;
            this.resData.gender = datas.gender;
            this.resData.image = datas.image;
            this.resData.role = datas.role;
        }
    }
}
