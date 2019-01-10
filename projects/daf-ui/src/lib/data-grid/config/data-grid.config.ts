import { Observable } from 'rxjs/internal/Observable';
import { DataGridFeatures } from './data-grid-features.config';
import { ColumnDefinition } from './column-def.config';
import { DataGridFeaturesModel } from '../models/data-grid-features.model';

export class DataGridConfig {

    public columnDefs: Array<ColumnDefinition>;
    public features: DataGridFeaturesModel;
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
