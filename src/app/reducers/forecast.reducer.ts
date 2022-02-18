import {ForecastActions, ForecastActionTypes} from '../actions/forecast.actions';

export interface ForecastState {
  forecast: any;
}

export const initialState: ForecastState = {
    forecast: {}
};

export function forecastReducer(state = initialState, action: ForecastActions): ForecastState {
  switch (action.type) {
    case ForecastActionTypes.ForecastHourly:
        return state = action.forecast;
    case ForecastActionTypes.ForecastDaily:
        return state = action.forecast;
    default:
      return state;
  }
}