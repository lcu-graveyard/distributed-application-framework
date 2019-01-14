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
  set Config(val: DataGridConfig) {
    if (!val) {
      return;
    }

    this._config = val;
    this.setData();
  }
  get Config(): DataGridConfig {

    if (!this._config) {
      return;
    }
    return this._config;
  }

  /**
   * Material Sorter
   */
  @ViewChild(MatSort) Sort: MatSort;


  /**
   * Material Paginator
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Columns to display
   */
  public DisplayedColumns: Array<string> = [];

  /**
   * Grid data source
   */
  public DataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /**
   * Maintain the selected state
   */
  public Selection: SelectionModel<any> = new SelectionModel(true, []);

  /**
   * Toggle loading indicator
   */
  public ShowLoader: boolean = false;

  constructor(private cdref: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.Sorting();
    this.Pagination();
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
    if (!this.Config || !this.Config.columnDefs) {
      return;
    }

    this.createDisplayedColumns();

      if (this.Config.service) {
        this.showLoaderIndicator(true);
        // service is passed in from parent component using the grid
       this.Config.service
        .subscribe((res) => {
          this.DataSource.data = res;
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
    if (!this.Config || !this.Config.columnDefs) {
      return;
    }

    this.DisplayedColumns = this.Config.columnDefs.map(itm => {
      return itm.colType;
    });
  }

  /**
   * When sorting is set in columnDef
   */
  public Sorting(evt?: Event): void {
    this.DataSource.sort = this.Sort;
  }

  /**
   * Toggle pagination
   * Pagination properties
   */
  public Pagination(): void {
    if (!this.Config || !this.Config.features.paginator) {
      return;
    }

    this.DataSource.paginator =  this.paginator;
  }

  /**
   * When filtering is enabled, run the filter
   * @param filterValue term to fitler on
   */
  public ApplyFilter(filterValue: string): void {
    if (!this.Config.features.filter) {
      return;
    }

    this.DataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Toggle selection checkbox
   * @param config grid conifguration object
   * @param col grid column
   */
  public ToggleSelection(config: DataGridConfig, col: ColumnConfigModel): boolean {
    return col.colType === 'select';
  }
/**
 * Check to see if all rows are selected
 */
  public IsAllSelected(): boolean {
    const numSelected = this.Selection.selected.length;
    const numRows = this.DataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Select all rows with the master toggle checkbox
   */
  public MasterToggle(): void {
    this.IsAllSelected() ? this.Selection.clear() : this.DataSource.data.forEach(row => this.Selection.select(row));
  }

  /**
   *
   * @param val property to toggle loading indicator
   */
  private showLoaderIndicator(val: boolean): void {

    if (!this.Config.features.showLoader) {
      return;
    }

    this.ShowLoader = val;
  }
}
