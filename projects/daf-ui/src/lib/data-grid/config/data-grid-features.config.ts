import { DataGridPagination } from './data-grid-pagination.config';

export class DataGridFeatures {
  public paginator: DataGridPagination;
  public rowSelectable: boolean = false;
  public filter: boolean = false;
  public showLoader: boolean = false;
  public showSelection: boolean = false;
}
