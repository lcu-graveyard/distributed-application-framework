import { PaginationConfig } from '../config/pagination.config';

export class DataGridFeaturesModel {
    public Paginator: PaginationConfig;
    public RowSelectable: boolean = false;
    public Filter: boolean = false;
    public ShowLoader: boolean = false;
    public ShowSelection: boolean = false;
  }
