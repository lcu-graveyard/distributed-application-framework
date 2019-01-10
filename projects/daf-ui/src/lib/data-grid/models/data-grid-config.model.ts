import { DataGridPagination } from '../config/data-grid-pagination.config';
import { ColumnDefinition } from './../config/column-def.config';
import { Observable } from 'rxjs/internal/Observable';


export class DataGridConfigModel {
  public columnDefs: Array<ColumnDefinition>;
  public filter?: boolean;
  public paginator?: DataGridPagination;
  public service?: Observable<any[]>;
}
