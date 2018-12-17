import { IColumnConfigModel } from '../models/column-config.model';

export class ColumnDefinition implements IColumnConfigModel {
  public colType: string;
  public title?: string;
  public value?: Function;
  public sortable?: boolean;
  public pipe?: string;

/**
 * Constructor for ColumnDefinition
 * @param colType Column data type
 * @param title Column title
 * @param value Function that passes in the column object and then returns the value, based of def
 * @param sortable Allow column to be sorted
 * @param pipe String value of pipe to use
 */

  constructor(colType: string, title?: string, value?: Function, sortable?: boolean, pipe?: string) {
    this.colType = colType;
    this.title = title;
    this.value = (colObj) => colObj[this.colType];
    this.sortable = sortable;
    this.pipe = pipe;
  }
}