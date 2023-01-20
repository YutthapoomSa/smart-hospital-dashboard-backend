export declare class PaginationService {
    private logger;
    paginationCal(total: number, perPage: number, pageCurrent: number): {
        skips: number;
        totalPages: number;
        limit: number;
    };
    genSqlLike(attributes: string[], textSearch: string): any;
}
