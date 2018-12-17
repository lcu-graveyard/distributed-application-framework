export class PaginationConfig {
    public pageSize: number;
    public pageSizeOptions: Array<number>;

    constructor(pageSize: number, pageSizeOptions: Array<number>) {
     this.pageSize = pageSize;
     this.pageSizeOptions = pageSizeOptions;
    }
   }