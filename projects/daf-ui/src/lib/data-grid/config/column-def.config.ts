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
 * @param ColType Column data type
 * @param Title Column title
 * @param ShowValue Boolean for toggling icons
 * @param ShowIcon Boolean for toggling icons
 * @param Sortable Allow column to be sorted
 * @param Pipe String value of pipe to use
 * @param IconConfigFunc Callback function for setting icons
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

