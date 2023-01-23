import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './../../helper/guard/user.decorator';
import { CreateSubMenuResDTO, CreateSubMenuReqDTO } from './dto/create-sub-menu.dto';
import { UpdateSubMenuDto, UpdateSubMenuResDTO } from './dto/update-sub-menu.dto';
import { SubMenuService } from './sub-menu.service';
import { UserDB } from './../../database/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { FindOneMenuResDTO } from './dto/findOne-subMenu.dto';

@Controller('sub-menu')
@ApiTags('SubMenu')
export class SubMenuController {
    constructor(private readonly subMenuService: SubMenuService) {}

    @Post('CreateSubMenu')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: CreateSubMenuResDTO })
    async create(@Body() body: CreateSubMenuReqDTO, @User() user: UserDB) {
        return await this.subMenuService.create(body, user);
    }

    @Get('SubMenu/FindAllSubMenus')
    async findAll() {
        return await this.subMenuService.findAll();
    }

    @Get('findOne/:submenu_id')
    @ApiOperation({ summary: 'findOne sub-menu' })
    @ApiOkResponse({ type: FindOneMenuResDTO })
    async findOne(@Param('submenu_id') submenu_id: number) {
        return await this.subMenuService.findOne(submenu_id);
    }

    @Patch('updateSubMenu/:submenu_id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UpdateSubMenuResDTO })
    @ApiOperation({ summary: 'Update Sub Menu' })
    async update(@Param('submenu_id') submenu_id: number, @Body() body: CreateSubMenuReqDTO, @User() user: UserDB) {
        return await this.subMenuService.update(submenu_id, body, user);
    }

    @Delete('deleteSubMenuBySubMenuId/:submenu_id')
    @ApiOperation({ summary: 'delete submenu' })
    async remove(@Param('submenu_id') submenu_id: number) {
        return await this.subMenuService.remove(submenu_id);
    }
}
