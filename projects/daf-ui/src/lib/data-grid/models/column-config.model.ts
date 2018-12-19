export interface IColumnConfigModel {
  colType: string;
  icon: string;
  title: string;
  value: (any) => any;
  valueAsIcon: boolean;
  sortable?: boolean;
  pipe?: string;
  iconConfigFunc?: Function;
  }
