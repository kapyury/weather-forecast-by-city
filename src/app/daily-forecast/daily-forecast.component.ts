import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ForecastState } from '../reducers/forecast.reducer';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit, OnDestroy {

  data: any;
  private subscription = new Subscription();

  constructor(private store: Store<ForecastState>) {
    this.subscription.add(this.store.select('forecast').subscribe(val => this.data = val));
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
