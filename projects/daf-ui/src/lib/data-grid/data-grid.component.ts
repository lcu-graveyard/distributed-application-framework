import { Component,
  ViewChild,
  AfterViewInit,
  Input,
  AfterContentChecked,
  ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { DataGridConfig } from './config/data-grid.config';
import { ColumnConfigModel } from './models/column-config.model';


@Component({
  selector: 'f-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements AfterViewInit, AfterContentChecked {

  /**
   * DataGrid configuration properties
   * @param columdDefs Definitions for column properties
   * @param service Service to call for data
   * @param features Pagination / Filtering and other configurables
   */
  private _config: DataGridConfig;

  @Input()
  set config(val: DataGridConfig) {
    if (!val) {
      return;
    }

    this._config = val;
    this.setData();
  }
  get config(): DataGridConfig {

    if (!this._config) {
      return;
    }
    return this._config;
  }

  /**
   * Material Sorter
   */
  @ViewChild(MatSort) sort: MatSort;


  /**
   * Material Paginator
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Columns to display
   */
  public displayedColumns: Array<string> = [];

  /**
   * Grid data source
   */
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /**
   * Maintain the selected state
   */
  public selection: SelectionModel<any> = new SelectionModel(true, []);

  /**
   * Toggle loading indicator
   */
  public showLoader: boolean = false;

  constructor(private cdref: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.sorting();
    this.pagination();
  }

  /**
   * Check view and children for changes
   */
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  /**
   * Set grid data
   */
  private setData(): void {
    if (!this.config || !this.config.columnDefs) {
      return;
    }

    this.createDisplayedColumns();

      if (this.config.service) {
        this.showLoaderIndicator(true);
        // service is passed in from parent component using the grid
       this.config.service
        .subscribe((res) => {
          this.dataSource.data = res;
        }, (err) => {
          console.error('data-grid.component.ts - setData error', err);
        }, () => {
          this.showLoaderIndicator(false);
        }
      );
    }
  }

  /**
   * Return array of columns to display
   */
  private createDisplayedColumns(): void {
    if (!this.config || !this.config.columnDefs) {
      return;
    }

    this.displayedColumns = this.config.columnDefs.map(itm => {
      return itm.ColType;
    });
  }

  /**
   * When sorting is set in columnDef
   */
  public sorting(evt?: Event): void {
    this.dataSource.sort = this.sort;
  }

  /**
   * Toggle pagination
   * Pagination properties
   */
  public pagination(): void {
    if (!this.config || !this.config.features.paginator) {
      return;
    }

    this.dataSource.paginator =  this.paginator;
  }

  /**
   * When filtering is enabled, run the filter
   * @param filterValue term to fitler on
   */
  public applyFilter(filterValue: string): void {
    if (!this.config.features.filter) {
      return;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Toggle selection checkbox
   * @param config grid conifguration object
   * @param col grid column
   */
  public toggleSelection(config: DataGridConfig, col: ColumnConfigModel): boolean {
    return col.colType === 'select';
  }
/**
 * Check to see if all rows are selected
 */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Select all rows with the master toggle checkbox
   */
  public masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   *
   * @param val property to toggle loading indicator
   */
  private showLoaderIndicator(val: boolean): void {

    if (!this.config.features.showLoader) {
      return;
    }

    this.showLoader = val;
  }
}
