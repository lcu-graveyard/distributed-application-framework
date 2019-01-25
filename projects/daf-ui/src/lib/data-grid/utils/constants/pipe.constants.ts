export class PipeConstants {
  static readonly DATE_FMT = 'dd/MMM/yyyy';
  static readonly DATE_TIME_FMT = `${PipeConstants.DATE_FMT} hh:mm:ss`;
  static readonly DATE_DAY_TIME = 'EEE h a';
  static readonly PIPE_DATE = 'date';
  static readonly PIPE_EPOCH = 'epoch';
  static readonly PIPE_NUMBER = 'number';
  static readonly PIPE_PERCENTAGE = 'percentage';
  static readonly PIPE_PERCENTAGE_DECIMAL = 'percentagedecimal'
  static readonly PIPE_TEMP_FAHRENHEIT = 'fahrenheit';
  static readonly PIPE_TEMP_CELSIUS = 'celsius';
  static readonly PIPE_MPH = 'mph';
}
