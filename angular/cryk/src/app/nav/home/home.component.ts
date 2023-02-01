import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDataAvailable = false;
  listCards: any[] = [];
  cards: Observable<any[]>;
  coinNames = ['dogecoin', 'bitcoin', 'ethereum', 'cardano', 'bytecoin']

  constructor(private homeService: HomeService,
              private breakpointObserver: BreakpointObserver){}

  ngOnInit(): void {
    this.coinNames.forEach(coinName => {
      this.homeService.getCurrentPriceForCoin(coinName)
        .subscribe( homeObj => 
        {
          this.homeService.getCryptoCoinImageByName(coinName)
            .subscribe( imageStr => {
              var imageCoin = 'data:image/png;base64,' + imageStr;
              this.listCards.push({ name: homeObj['name'], cols: 1, rows: 1, image: imageCoin, symbol: homeObj['symbol'], currentPriceUSD: homeObj['current_price']['usd'], currentPriceEUR: homeObj['current_price']['eur']});
              this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
                map(({ matches }) => {
                  return this.listCards;
                })
              );
            })          
        })
        this.isDataAvailable = true;
    });
  }
}
