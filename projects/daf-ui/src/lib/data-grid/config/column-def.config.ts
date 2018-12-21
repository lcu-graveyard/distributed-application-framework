import { IColumnConfigModel } from '../models/column-config.model';

export class ColumnDefinition implements IColumnConfigModel {
  public colType: string;
  public icon: string;
  public title: string;
  public sortable?: boolean;
  public pipe?: string;
  public value: string;
  public showIcon: boolean;
  public showValue: boolean;
  public iconConfigFunc?: Function;

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
   * Set values and toggle icons and data values on and off
   * @param colObj Each item coming from the grid rows
   */
  public setValue<T>(colObj: T): void {

    if (this.showIcon && this.iconConfigFunc) {
      this.icon = this.iconConfigFunc(colObj, this.colType);
    }

    if (this.showValue) {
      this.value = colObj[this.colType];
    }
  }
}

