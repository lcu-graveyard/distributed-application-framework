import { Observable } from 'rxjs/internal/Observable';
import { ColumnDefinition } from './column-def.config';
import { DataGridFeaturesModel } from '../models/data-grid-features.model';

export class DataGridConfig {

    public ColumnDefs: Array<ColumnDefinition>;
    public Features: DataGridFeaturesModel;
    public Service: Observable<any[]>;

  /**
   * Constructor for DataGridConfig
   * @param columdDefs Definitions for column properties
   * @param service Service to call for data
   * @param features Pagination and Filtering, and other things
   */

  constructor(service: Observable<any[]>, columnDefs: Array<ColumnDefinition>, features?: DataGridFeaturesModel) {
    this.ColumnDefs = columnDefs;
    this.Features = features;
    this.Service = service;
  }
}
