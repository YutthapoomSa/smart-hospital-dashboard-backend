import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateSubMenuDto } from './dto/update-sub-menu.dto';
import { SubMenuService } from './sub-menu.service';

@Controller('sub-menu')
@ApiTags('SubMenu')
export class SubMenuController {
    constructor(private readonly subMenuService: SubMenuService) {}

    // @Post()
    // create(@Body() createSubMenuDto: CreateSubMenuReqDTO) {
    //     return this.subMenuService.create(createSubMenuDto);
    // }

    @Get('SubMenu/FindAllSubMenus')
    async findAll() {
        return await this.subMenuService.findAll();
    }

    @Get('findOne/:id')
    @ApiOperation({ summary: 'findOne sub-menu' })
    async findOne(@Param('submenu_id') submenu_id: number) {
        return await this.subMenuService.findOne(submenu_id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSubMenuDto: UpdateSubMenuDto) {
        return this.subMenuService.update(+id, updateSubMenuDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.subMenuService.remove(+id);
    }
}
