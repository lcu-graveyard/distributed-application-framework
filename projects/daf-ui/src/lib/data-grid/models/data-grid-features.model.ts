import { PaginationConfig } from '../config/pagination.config';

export class IDataGridFeaturesModel {
    public paginator: PaginationConfig;
    public rowSelectable: boolean = false;
    public filter: boolean = false;
    public showLoader: boolean = false;
    public showSelection: boolean = false;
  }