import { Action } from '@ngrx/store';

export enum ForecastActionTypes {
    ForecastHourly = '[Forecast] Hourly',
    ForecastDaily = '[Forecast] Daily'
}

export class ForecastHourly implements Action {
    readonly type = ForecastActionTypes.ForecastHourly;

    constructor(public forecast: any){}
}

export class ForecastDaily implements Action {
    readonly type = ForecastActionTypes.ForecastDaily;

    constructor(public forecast: any){}
}

export type ForecastActions = ForecastHourly | ForecastDaily;
