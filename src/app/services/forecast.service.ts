import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  onSearch(searchInput: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const coordinatesUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=010721642521f31b0fbc8c3831d45951`;
      this.http.get(coordinatesUrl).subscribe(response => {
        if (response) {
          resolve(response);
        } else {
          reject('No response from server');
        }
      });
    })
  }

  getHourlyForecastByCity(coordinates: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const hourlyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,daily,alerts&appid=010721642521f31b0fbc8c3831d45951`;
      this.http.get(hourlyUrl).subscribe(response => {
        if (response) {
          resolve(response);
        } else {
          reject('No response from server');
        }
      });
    });
  }

  getDailyForecastByCity(coordinates: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const hourlyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=010721642521f31b0fbc8c3831d45951`;
      this.http.get(hourlyUrl).subscribe(response => {
        if (response) {
          resolve(response);
        } else {
          reject('No response from server');
        }
      });
    });
  }
}
