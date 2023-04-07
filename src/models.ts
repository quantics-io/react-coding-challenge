export type ForecastRunDto = {
  id: string;
  name: string;
  creationDate: string;
  user: UserDetailsDto;
  period: ForecastPeriodDto;
};

export type UserDetailsDto = {
  firstname: string;
  lastname: string;
  email: string;
};

export type ForecastPeriodDto = {
  start: string;
  end: string;
};

export enum ErrorMessages {
  NoValidJsonAtLocation = 'no file with valid JSON format at the location',
  NotEnoughForecasts = 'not enough forecasts (at least two) available'
}