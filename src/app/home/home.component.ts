import { ForecastService, weekDays } from './../services/forecast.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Store } from '@ngrx/store';
import { ForecastActionTypes } from '../actions/forecast.actions';
import { ForecastState } from '../reducers/forecast.reducer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('searchField') searchField: ElementRef;
  coordinates: any;
  error: any = null;
  constructor(private http: HttpClient, private chDet: ChangeDetectorRef, private spinner: NgxSpinnerService,
     private store: Store<ForecastState>, private router: Router, private route: ActivatedRoute, 
     private forecastService: ForecastService) {
  }

  ngOnInit(): void {
    this.router.navigate(['']);

  }

  async hourlyForecast() {
    if (this.coordinates && this.searchField.nativeElement.value === this.coordinates.name) {
      this.spinner.show();
      let response = await this.forecastService.getHourlyForecastByCity(this.coordinates);
      this.spinner.hide();
      let val = this.getHourlyForecastObject(response);
      if (val) {
        this.store.dispatch({ type: ForecastActionTypes.ForecastHourly, forecast: val });
        this.router.navigate(['hourly-forecast'], { relativeTo: this.route, queryParams: { city: this.coordinates.name } });
      }
    } else {
      this.error = 'Please search a city first';
    }
  }

  async dailyForecast() {
    if (this.coordinates && this.searchField.nativeElement.value === this.coordinates.name) {
      this.spinner.show();
      let response = await this.forecastService.getDailyForecastByCity(this.coordinates);
      this.spinner.hide();
      let val = this.getDailyForecastObject(response);
      if (val) {
        this.store.dispatch({ type: ForecastActionTypes.ForecastDaily, forecast: val });
        this.router.navigate(['daily-forecast'], { relativeTo: this.route, queryParams: { city: this.coordinates.name } });
      }
    } else {
      this.error = 'Please search a city first';
    }
  }

  searchCity() {
    this.spinner.show();
    this.error = null;
    if (this.searchField.nativeElement.value.length > 0) {
      this.forecastService.onSearch(this.searchField.nativeElement.value).then(response => {
        this.coordinates = response.shift();
        this.spinner.hide();
      });
    } else {
      this.error = 'Please enter a city';
      this.spinner.hide();
    }

  }

  private getHourlyForecastObject(response) {
    if (response && response.hourly) {
      const dataSource = response.hourly;
      let hoursArr = [];
      let temperaturesArr = [];
      for (let i = 0; i < 24; i = i + 3) {
        temperaturesArr.push(Math.round(dataSource[i]['temp'] - 273.15));
        let now = new Date(dataSource[i]['dt'] * 1000);
        let hour = now.getUTCHours();
        if (hour.toString().length === 2) {
          hoursArr.push(hour.toString().padEnd(5, ':00'));
        } else if (hour.toString().length === 1) {
          hoursArr.push(hour.toString().padStart(2, '0').padEnd(5, ':00'));
        }
      }
      return { city: this.coordinates.name, first: hoursArr, second: temperaturesArr };
    } else {
      this.error = "No response from the server";
    }
  }

  private getDailyForecastObject(response) {
    if (response && response.daily) {
      const dataSource = response.daily;
      this.chDet.detectChanges();
      let daysArr = [];
      let temperaturesArr = [];
      for (let i = 0; i < 7; i++) {
        let now = new Date(dataSource[i]['dt'] * 1000);
        let day = now.getUTCDay();
        daysArr.push(weekDays[day]);
        temperaturesArr.push(Math.round(dataSource[i]['temp']['day'] - 273.15));
      }
      return { city: this.coordinates.name, first: daysArr, second: temperaturesArr };
    } else {
      this.error = "No response from the server"
    }
  }
}
