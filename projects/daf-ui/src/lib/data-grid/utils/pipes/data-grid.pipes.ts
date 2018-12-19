import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe, PercentPipe } from '@angular/common';

import { PipeConstants } from '../constants/pipe.constants';

@Pipe({
  name: 'dataGridPipes'
})

export class DataGridPipes implements PipeTransform {
  transform(value: any, args?: any): any {

    if (!args) {
      return value;
    }

    if (args.toLowerCase() === PipeConstants.PIPE_DATE) {
      const pipe = new DatePipe('en-US');
      const transformed = pipe.transform(value, PipeConstants.DATE_FMT);
      return transformed;
    }

    if (args.toLowerCase() === PipeConstants.PIPE_EPOCH) {
      const pipe = new DatePipe('en-US');
      const transformed = pipe.transform(value * 1000, PipeConstants.DATE_DAY_TIME);
      return transformed;
    }

    if (args.toLowerCase() === PipeConstants.PIPE_NUMBER) {
      const pipe = new DecimalPipe('en-US');
      const transformed = pipe.transform(value, '1.2-2');
      return transformed;
    }

    if (args.toLowerCase() === PipeConstants.PIPE_MPH) {
      const pipe = new DecimalPipe('en-US');
      const transformed = pipe.transform(value, '1.2-2');
      return transformed + ' mph';
    }

    if (args.toLowerCase() === PipeConstants.PIPE_PERCENTAGE) {
      const pipe = new PercentPipe('en-US');
      const transformed = pipe.transform(value);
      return transformed;
    }

    if (args.toLowerCase() === PipeConstants.PIPE_TEMP_FAHRENHEIT) {
      const pipe = new DecimalPipe('en-US');
     // const temperature = (value * 32) + 1.8;
      const transformed = pipe.transform(value, '1.2-2');

      return transformed + ' °F';
    }

    if (args.toLowerCase() === PipeConstants.PIPE_TEMP_CELSIUS) {
      const pipe = new DecimalPipe('en-US');
     // const tempareature = (value - 32) / 1.8 ;
      const transformed = pipe.transform(value, '1.2-2');

      return transformed + ' °F';
    }


    /**
     * IF none of the above work, return the original value
     */
    return value;
  }
}
