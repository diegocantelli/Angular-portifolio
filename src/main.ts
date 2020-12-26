//main.ts é o primeiro código a ser executado pelo angular

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//este serviço não usa a injeção de dependência do Angular, por isso foi carregado aqui
import { ConfigService } from './app/services/config.service';

ConfigService.set('api', 'https://angular-in-action-portfolio.firebaseio.com/stocks.json');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
