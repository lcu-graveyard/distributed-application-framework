import { DataGridPagination } from '../config/data-grid-pagination.config';
import { ColumnDefinition } from './../config/column-def.config';
import { Observable } from 'rxjs/internal/Observable';


export interface IDataGridConfigModel {
  columnDefs: Array<ColumnDefinition>;
  filter?: boolean;
  paginator?: DataGridPagination;
  service?: Observable<any[]>;
}
