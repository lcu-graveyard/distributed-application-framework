import { Observable } from 'rxjs/internal/Observable';
import { DataGridFeatures } from './data-grid-features.config';
import { IDataGridConfigModel } from '../models/data-grid-config.model';
import { ColumnDefinition } from './column-def.config';
import { IDataGridFeaturesModel } from '../models/data-grid-features.model';

export class DataGridConfig implements IDataGridConfigModel {

    public columnDefs: Array<ColumnDefinition>;
    public features: IDataGridFeaturesModel;
    public service: Observable<any[]>;

  /**
   * Constructor for DataGridConfig
   * @param columdDefs Definitions for column properties
   * @param service Service to call for data
   * @param features Pagination and Filtering, and other things
   */

  constructor(service: Observable<any[]>, columnDefs: Array<ColumnDefinition>, features?: DataGridFeatures) {
    this.columnDefs = columnDefs;
    this.features = features;
    this.service = service;
  }
}
