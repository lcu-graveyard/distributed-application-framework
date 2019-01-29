import { ColumnConfigModel } from '../models/column-config.model';

export class ColumnDefinition {
  public colType: string;
  public icon: string;
  public iconConfigFunc?: Function;
  public pipe?: string;
  public title: string;
  public showIcon: boolean;
  public showValue: boolean;
  public sortable?: boolean;
  public value: string;

/**
 * Constructor for Grid column definitions
 * @param colType Column data type
 * @param title Column title
 * @param value Function that passes in the column object and then returns the value, based of def
 * @param showValue Boolean for toggling icons
 * @param showIcon Boolean for toggling icons
 * @param sortable Allow column to be sorted
 * @param pipe String value of pipe to use
 * @param iconConfigFunc Callback function for setting icons
 */

  constructor(colType: string,
              title: string,
              showValue: boolean,
              showIcon: boolean,
              sortable?: boolean,
              pipe?: string,
              iconConfigFunc?: Function) {

    this.colType = colType;
    this.title = title;
    this.showValue = showValue;
    this.showIcon = showIcon;
    this.sortable = sortable;
    this.pipe = pipe;
    this.iconConfigFunc = iconConfigFunc;
  }

  /**
   * Toggle icons or data values on / off
   * @param colObj Each item coming from the grid rows
   */
  public setIcon<T>(colObj: T): void {

    if (this.showIcon && this.iconConfigFunc) {
     return this.iconConfigFunc(colObj, this.colType);
    }
  }
}

