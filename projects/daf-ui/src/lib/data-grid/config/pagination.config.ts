export class PaginationConfig {
    public PageSize: number;
    public PageSizeOptions: Array<number>;

    constructor(pageSize: number, pageSizeOptions: Array<number>) {
     this.PageSize = pageSize;
     this.PageSizeOptions = pageSizeOptions;
    }
   }
