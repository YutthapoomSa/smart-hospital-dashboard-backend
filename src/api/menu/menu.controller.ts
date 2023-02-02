import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDB } from './../../database/entity/user.entity';
import { User } from './../../helper/guard/user.decorator';
import { CreateMenuDTO, CreateMenuResDTO } from './dto/create-menu.dto';
import { FindAllMenuResDTO } from './dto/findAll-menu.dto';
import { FindOneMenuResDTO } from './dto/findOne-menu.dto';
import { UpdateMenuDTO, UpdateMenuResDTO } from './dto/update-menu.dto';
import { ApiMenuService } from './service/api-menu.service';
import { MenuService } from './service/menu.service';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService, private readonly apiMenuService: ApiMenuService) { }

    @Post('createMenu')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: CreateMenuResDTO })
    @ApiOperation({ summary: 'สร้างรายการเมนู' })
    async create(@User() user: UserDB, @Body() body: CreateMenuDTO) {
        return await this.apiMenuService.api_create(body, user);
    }

    @Patch('updateMenu/:menuId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UpdateMenuResDTO })
    @ApiOperation({ summary: 'อัพเดตรายการเมนู' })
    async update(@Param('menuId') menuId: number, @Body() updateMenuDto: UpdateMenuDTO, @User() user: UserDB) {
        return await this.apiMenuService.api_update(menuId, updateMenuDto, user);
    }

    @Get('findOne/:menuId')
    @ApiOperation({ summary: 'ค้นหารายการเมนูโดย id' })
    @ApiOkResponse({ type: FindOneMenuResDTO })
    async findOne(@Param('menuId') menuId: number) {
        return await this.apiMenuService.api_findOne(menuId);
    }

    @Get('Menu/findAllMenu')
    @ApiOperation({ summary: 'findAll menu' })
    @ApiOkResponse({ type: FindAllMenuResDTO })
    async findAll() {
        return await this.apiMenuService.api_findAll();
    }

    @Delete('DeleteMenuByMenuId/:menuId')
    @ApiOperation({ summary: 'delete menu' })
    async remove(@Param('menuId') menuId: number) {
        return await this.apiMenuService.api_remove(menuId);
    }
}
