import { ColumnConfigModel } from '../models/column-config.model';

export class ColumnDefinition {
  public ColType: string;
  public IconConfigFunc?: Function;
  public Pipe?: string;
  public Title: string;
  public ShowIcon: boolean;
  public ShowValue: boolean;
  public Sortable?: boolean;

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

    this.ColType = colType;
    this.Title = title;
    this.ShowValue = showValue;
    this.ShowIcon = showIcon;
    this.Sortable = sortable;
    this.Pipe = pipe;
    this.IconConfigFunc = iconConfigFunc;
  }

  /**
   * Toggle icons or data values on / off
   * @param colObj Each item coming from the grid rows
   */
  public SetIcon<T>(colObj: T): void {

    if (this.ShowIcon && this.IconConfigFunc) {
     return this.IconConfigFunc(colObj, this.ColType);
    }
  }
}

