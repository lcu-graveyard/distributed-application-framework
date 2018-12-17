import { ColumnDefinition } from '../config/column-def.config';
import { PaginationConfig } from '../config/pagination.config';

export interface IDataGridModel {
    api: string;
    columnDefs: Array<ColumnDefinition>;
    data: Array<any>;
    filter?: boolean;
    paginator?: PaginationConfig;
    service?: any;
  }