import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClarityModule } from 'clarity-angular';
import { CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { InvestmentsComponent } from './investments/investments.component';
import { TickerComponent } from './ticker/ticker.component';
import { StocksComponent } from './stocks/stocks.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';

import { LocalStorageService } from './services/local-storage.service';
import { AccountService } from './services/account.service';
import { StocksInterceptor } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentsComponent,
    TickerComponent,
    StocksComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    HttpClientModule
  ],

  //local onde os serviços devem ser registrados
  //nas versões mais novas do Angular esse passo não é mais necessários
  //basta decorar com @injectable({providerIn: 'root'}) 
  providers: [
    LocalStorageService,
    CurrencyPipe,
    AlertService,
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StocksInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
