import { OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SubMenuDB } from './../../database/entity/sub-menu.entity';
export declare class SubMenuRepository implements OnApplicationBootstrap {
    private readonly sequelize;
    private readonly subMenuRepositoryModel;
    private logger;
    constructor(sequelize: Sequelize, subMenuRepositoryModel: typeof SubMenuDB);
    onApplicationBootstrap(): void;
    findAll(): Promise<SubMenuDB[]>;
    findOne(id: number): Promise<SubMenuDB>;
}
