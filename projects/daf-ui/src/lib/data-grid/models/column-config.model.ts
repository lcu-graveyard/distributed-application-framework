export interface IColumnConfigModel {
  colType: string;
  icon: string;
  iconConfigFunc?: Function;
  pipe?: string;
  showIcon: boolean;
  showValue: boolean;
  sortable?: boolean;
  title: string;
  value: string;
}
