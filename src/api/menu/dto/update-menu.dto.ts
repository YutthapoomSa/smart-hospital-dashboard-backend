import { PartialType } from '@nestjs/swagger';
import { CreateMenuDTO } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDTO) {}
