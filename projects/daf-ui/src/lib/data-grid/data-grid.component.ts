import { Component, OnInit, ViewChild, AfterViewInit, Input, Output } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { DataGridConfig } from './config/data-grid.config';
import { IColumnConfigModel } from './models/column-config.model';


@Component({
  selector: 'f-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit, AfterViewInit {

  /**
   * DataGrid configuration properties
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

  constructor() { }

  ngOnInit() {
    this.createDisplayedColumns();
  }

  ngAfterViewInit() {
    this.sorting();
    this.pagination();
  }

  /**
   * Set grid data
   */
  private setData(): void {
    if (!this.config || !this.config.columnDefs) {
      return;
    }

    this.dataSource.data = this.config.data;
  }
  /**
   * Return array of columns to display
   */
  private createDisplayedColumns(): void {
    if (!this.config || !this.config.columnDefs) {
      return;
    }

    this.displayedColumns = this.config.columnDefs.map(itm => {
      return itm.colType;
    });
  }

  /**
   * When sorting is set in columnDef
   */
  private sorting(): void {
    this.dataSource.sort = this.sort;
  }

  /**
   * Toggle pagination
   * Pagination properties
   */
  private pagination(): void {
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
  public toggleSelection(config: DataGridConfig, col: IColumnConfigModel): boolean {
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
}