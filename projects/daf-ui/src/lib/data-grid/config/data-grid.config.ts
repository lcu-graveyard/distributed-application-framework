import { IDataGridModel } from '../models/data-grid-config.model';
import { ColumnDefinition } from './column-def.config';
import { IDataGridFeaturesModel } from '../models/data-grid-features.model';

export class DataGridConfig implements IDataGridModel {

    public api: string;
    public columnDefs: Array<ColumnDefinition>;
    public data: Array<any>;
    public features: IDataGridFeaturesModel;

  /**
   * Constructor for DataGridConfig
   * @param api API URL
   * @param columdDefs Definitions for column properties
   * @param service Service to call for data
   * @param features Pagination and Filtering, and other things
   */

    constructor(api: string, columnDefs: Array<ColumnDefinition>, data: Array<any>, features?: IDataGridFeaturesModel) {
      this.api = api;
      this.columnDefs = columnDefs;
      this.data = data;
      this.features = features;
  }
}