import { OnApplicationBootstrap } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserDB } from './../../../database/entity/user.entity';
export declare class CacheUsersService implements OnApplicationBootstrap {
    private cacheManager;
    private logger;
    constructor(cacheManager: Cache);
    onApplicationBootstrap(): void;
    setCacheUser(user: UserDB): Promise<void>;
    getCacheUser(id: number): Promise<UserDB>;
    removeCacheUser(id: number): Promise<void>;
    private removeAll;
}
