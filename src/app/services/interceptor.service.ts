import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpEvent, HttpInterceptor, HttpResponse, HttpHandler, HttpRequest }
  from '@angular/common/http';
import { AccountService } from './account.service';
import { Stock } from './stocks.model';
import { ConfigService } from './config.service';

@Injectable()
//Para ciar um interceptor é necessário implementar a interface HttpInterceptor
export class StocksInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) { }

  //HttpRequest -> possui informações sobre a url sendo chamada, o payload, os headers e etc
  //  trata-se de um objeto imutável, é necessário cloná-lo se quiser fazer modificações
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //req.clone -> retorna uma cópia do request
    const request = req.clone();

    //adiciona e altera as informações na cópia da requisição
    request.headers.append('Accept', 'application/json');

    //retorna o request clonado com as informações que foram alteradas/adicionadas
    //Do -> depois de recebido o response permite realizar alguma lógica sem alterar o response, ao contrário do map
    return next.handle(request).do(event => {
      if (event instanceof HttpResponse && event.url === ConfigService.
        get('api')) {

        //acessando o body vindo do response
        const stocks = event.body as Array<Stock>;

        let symbols = this.accountService.stocks.map(stock => stock.symbol);
        stocks.forEach(stock => {
          this.accountService.stocks.map(item => {
            if (stock.symbol === item.symbol) {
              item.price = stock.price;
              item.change = ((stock.price * 100) - (item.cost * 100)) / 100;
            }
          });
        });
        this.accountService.calculateValue();
        return stocks;
      }
    });
  }
}