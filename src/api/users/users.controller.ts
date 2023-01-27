import { FindOneUserResDTO } from './dto/find-one-user-res.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserDB } from './../../database/entity/user.entity';
import { User } from './../../helper/guard/user.decorator';
import { CreateUserReqDTO } from './dto/create-user-req.dto';
import { ApiUsersService } from './services/api-users.service';
import { UserLoginRequestDTO } from './dto/user-login.dto';
import { UserLoginRefreshToKenReqDto } from './dto/user-login-refreshToken.dto';
import { UpdateUserDto, UpdateUserResDTO } from './dto/update-user.dto';
import { GlobalResDTO } from '../global-dto/global-res.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { CreateUserImage } from './dto/create-user-image.dto';
import { UsersService } from './services/users.service';
import { editFileName, imageFileFilter } from 'src/shared/utils/file-upload.utils';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly apiUsersService: ApiUsersService, private readonly userService: UsersService) {}

    // Register with guest
    @Post('register')
    @ApiOperation({ summary: 'สร้างuserสำหรับ Admin' })
    @ApiOkResponse({ type: FindOneUserResDTO })
    register(@Body() body: CreateUserReqDTO) {
        return this.apiUsersService.api_create(body);
    }

    @Post('registerWithAdmin')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Adminเป็นคนสร้างให้User' })
    @ApiOkResponse({ type: FindOneUserResDTO })
    async registerWithAdmin(@Body() body: CreateUserReqDTO, @User() user: UserDB) {
        return this.apiUsersService.api_createWithAdmin(body, user);
    }

    @Post('login')
    login(@Body() body: UserLoginRequestDTO) {
        return this.apiUsersService.api_login(body);
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: FindOneUserResDTO })
    find(@Param('id') id: number): Promise<FindOneUserResDTO> {
        return this.apiUsersService.api_findOne(id);
    }

    @Post('refreshToken')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    refreshToken(@User() user: UserDB, @Body() body: UserLoginRefreshToKenReqDto) {
        return this.apiUsersService.api_refreshToken(user, body);
    }

    @Patch('updateUserById')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UpdateUserResDTO })
    updateUserById(@User() user: UserDB, @Body() body: UpdateUserDto) {
        return this.apiUsersService.api_updateUserById(user, body);
    }

    @Delete('delete/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'ลบข้อมู,ผู้ใช้' })
    @ApiParam({ name: 'userId', type: 'string' })
    @ApiOkResponse({ type: GlobalResDTO })
    delete(@Param('id') id: number): Promise<GlobalResDTO> {
        return this.apiUsersService.api_delete(id);
    }

    @Post('uploads-image/:userId')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'เพิ่มรูปภาพของผู้ใช้งาน' })
    @UseInterceptors(
        FilesInterceptor('image', 1, {
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
            storage: diskStorage({
                destination: `${path.resolve(__dirname, '..', '..', '..', 'upload', 'image-user')}`,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    uploadUserImage(
        @UploadedFiles() image: Express.Multer.File[],
        @Body() body: CreateUserImage,
        @Param('userId') userId: number,
    ) {
        return this.userService.uploadUserImage(image, userId);
    }
}
