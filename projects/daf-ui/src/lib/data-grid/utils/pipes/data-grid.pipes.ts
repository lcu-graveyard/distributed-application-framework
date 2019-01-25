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

    /**
     * Return date
     */
    if (args.toLowerCase() === PipeConstants.PIPE_DATE) {
      const pipe = new DatePipe('en-US');
      const transformed = pipe.transform(value, PipeConstants.DATE_FMT);
      return transformed;
    }

    /**
     * Return date from epoch value
     */
    if (args.toLowerCase() === PipeConstants.PIPE_EPOCH) {
      const pipe = new DatePipe('en-US');
      const transformed = pipe.transform(value * 1000, PipeConstants.DATE_DAY_TIME);
      return transformed;
    }

    /**
     * Return number with decimal
     */
    if (args.toLowerCase() === PipeConstants.PIPE_NUMBER) {
      const pipe = new DecimalPipe('en-US');
      const transformed = pipe.transform(value, '1.2-2');
      return transformed;
    }

    /**
     * Return return number with mph appended
     */
    if (args.toLowerCase() === PipeConstants.PIPE_MPH) {
      const pipe = new DecimalPipe('en-US');
      const transformed = pipe.transform(value, '1.2-2');
      return transformed + ' mph';
    }

    /**
     * Return percentage
     */
    if (args.toLowerCase() === PipeConstants.PIPE_PERCENTAGE) {
      const pipe = new PercentPipe('en-US');
      const transformed = pipe.transform(value);
      return transformed;
    }

    /**
     * Return percentage as decimal
     */
    if (args.toLowerCase() === PipeConstants.PIPE_PERCENTAGE_DECIMAL) {
      const pipe = new PercentPipe('en-US');
      const transformed = pipe.transform(value, '2.2-2');
      return transformed;
    }

    /**
     * Return temperature in fahrenheit, append °F
     */
    if (args.toLowerCase() === PipeConstants.PIPE_TEMP_FAHRENHEIT) {
      const pipe = new DecimalPipe('en-US');
     // const temperature = (value * 32) + 1.8;
      const transformed = pipe.transform(value, '1.2-2');

      return transformed + ' °F';
    }

    /**
     * Return temperature in celsius, append °C
     */
    if (args.toLowerCase() === PipeConstants.PIPE_TEMP_CELSIUS) {
      const pipe = new DecimalPipe('en-US');
     // const tempareature = (value - 32) / 1.8 ;
      const transformed = pipe.transform(value, '1.2-2');

      return transformed + ' °C';
    }


    /**
     * IF none of the above work, return the original value
     */
    return value;
  }
}
