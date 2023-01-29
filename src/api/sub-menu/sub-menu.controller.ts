import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDB } from './../../database/entity/user.entity';
import { User } from './../../helper/guard/user.decorator';
import { CreateSubMenuReqDTO, CreateSubMenuResDTO } from './dto/create-sub-menu.dto';
import { FindAllSubMenuResDTO } from './dto/findAll-SubMenu.dto';
import { FindOneSubMenuResDTO } from './dto/findOne-subMenu.dto';
import { UpdateSubMenuDTO, UpdateSubMenuResDTO } from './dto/update-sub-menu.dto';
import { SubMenuService } from './sub-menu.service';

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
    @ApiOperation({ summary: 'findAll sub-menu' })
    @ApiOkResponse({ type: FindAllSubMenuResDTO })
    async findAll() {
        return await this.subMenuService.findAll();
    }

    @Get('findOne/:submenuId')
    @ApiOperation({ summary: 'findOne sub-menu' })
    @ApiOkResponse({ type: FindOneSubMenuResDTO })
    async findOne(@Param('submenuId') submenuId: number) {
        return await this.subMenuService.findOne(submenuId);
    }

    @Patch('updateSubMenu/:submenuId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UpdateSubMenuResDTO })
    @ApiOperation({ summary: 'Update Sub Menu' })
    async update(@Body() body: UpdateSubMenuDTO, @User() user: UserDB) {
        return await this.subMenuService.update(body, user);
    }

    @Delete('deleteSubMenuBysubmenuId/:submenuId')
    @ApiOperation({ summary: 'delete submenu' })
    async remove(@Param('submenuId') submenuId: number) {
        return await this.subMenuService.remove(submenuId);
    }
}
