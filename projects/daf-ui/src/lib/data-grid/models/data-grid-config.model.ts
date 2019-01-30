import { DataGridPagination } from '../config/data-grid-pagination.config';
import { ColumnDefinition } from './../config/column-def.config';
import { Observable } from 'rxjs/internal/Observable';


export class DataGridConfigModel {
  public ColumnDefs: Array<ColumnDefinition>;
  public Filter?: boolean;
  public Paginator?: DataGridPagination;
  public Service?: Observable<any[]>;
}
