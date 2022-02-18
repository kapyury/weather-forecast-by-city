import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyForecastComponent } from './daily-forecast/daily-forecast.component';
import { HomeComponent } from './home/home.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'daily-forecast',
        component: DailyForecastComponent
      },
      {
        path: 'hourly-forecast',
        component: HourlyForecastComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
