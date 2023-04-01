
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

export interface Period {
  start: Date
  end: Date
}

export interface IForecast {
  name: string
  period: Period
};
