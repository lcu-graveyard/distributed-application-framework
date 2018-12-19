import { IColumnConfigModel } from '../models/column-config.model';

export class ColumnDefinition implements IColumnConfigModel {
  public colType: string;
  public icon: string;
  public title: string;
  public sortable: boolean;
  public pipe?: string;
  public value: (any) => any;
  public valueAsIcon: boolean;
  public columnData: Object = {};
  public iconConfigFunc;

/**
 * Constructor for ColumnDefinition
 * @param colType Column data type
 * @param title Column title
 * @param value Function that passes in the column object and then returns the value, based of def
 * @param valueAsIcon Boolean for toggling icons instead of showing data
 * @param sortable Allow column to be sorted
 * @param pipe String value of pipe to use
 * @param iconConfigFunc Callback function for setting icons
 */

  constructor(colType: string,
              title: string, value: (any) => any,
              valueAsIcon: boolean,
              sortable?: boolean,
              pipe?: string,
              iconConfigFunc?: Function) {

    this.colType = colType;
    this.title = title;
    this.value = (colObj) => colObj[colType];
    this.valueAsIcon = valueAsIcon;
    this.sortable = sortable;
    this.pipe = pipe;
    this.iconConfigFunc = iconConfigFunc;
  }

  /**
   * This will show an icon instead of a data value
   * @param val item being returned for each column
   */
  public setColumnData<T>(val: T): void {
    this.columnData = val;

    /**
     * Set icon, based of callback function from the 'parent' class
     */
    if (this.iconConfigFunc) {
     this.icon = this.iconConfigFunc(this.columnData, this.colType);
    }
  }
}

