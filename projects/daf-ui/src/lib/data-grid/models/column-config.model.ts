export interface IColumnConfigModel {
  colType: string;
  icon: string;
  title: string;
  value: string;
  showIcon: boolean;
  showValue: boolean;
  sortable?: boolean;
  pipe?: string;
  iconConfigFunc?: Function;
}
