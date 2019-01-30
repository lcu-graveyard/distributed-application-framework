import { PaginationConfig } from '../config/pagination.config';

/**Datagrid Features */
export class DataGridFeaturesModel {
    public Paginator: PaginationConfig;
    public RowSelectable: boolean = false;
    public Filter: boolean = false;
    public ShowLoader: boolean = false;
    public ShowSelection: boolean = false;
  }
