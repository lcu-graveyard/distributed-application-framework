import { PipeConstants } from './pipe.constants';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (args && args.toLowerCase() === 'date') {
      return super.transform(value, PipeConstants.DATE_FMT);
    } else {
      return value;
    }
  }
}