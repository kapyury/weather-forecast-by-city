import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import {StoreModule} from '@ngrx/store';
import { forecastReducer } from './reducers/forecast.reducer';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { DailyForecastComponent } from './daily-forecast/daily-forecast.component';
import { ForecastService } from './services/forecast.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HourlyForecastComponent,
    DailyForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    NgxSpinnerModule,
    StoreModule.forRoot({forecast: forecastReducer})
  ],
  providers: [ForecastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
