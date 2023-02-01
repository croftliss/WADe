import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { Coin } from 'src/app/shared-models/coin.model';
import { CryptoCurrency } from 'src/app/shared-models/crypto-currency.model';
import { ExtensionsService } from 'src/app/shared-services/extensions.service';
import { Observable } from 'rxjs';
import { WalletService } from './wallet.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  isDataAvailable = false;
  portofolio = new Map<string, number>();
  cryptos: CryptoCurrency[] = [];
  listCards: any[] = [];
  cards: Observable<any[]>;

  constructor(private walletService: WalletService,
              private breakpointObserver: BreakpointObserver,
              private extensions: ExtensionsService){}

  ngOnInit(): void {
    const userId = localStorage.getItem('id')
    this.walletService.getUserPortofolio(userId ?? '')
      .subscribe( portofolio => {
        var names: string[] = [];
        for (var value in portofolio['coins']) {
          this.portofolio.set(value, portofolio['coins'][value]);
          names.push(value.toString());
        }
        this.walletService.getPortoCryptoDetails('json-ld', names)
          .subscribe( cryptos => {
            this.cryptos = this.extensions.convertJsonLdToCryptoObjects(cryptos);
            this.cryptos.forEach(crypto => {
              this.walletService.getCryptoCoinImageByName(crypto.name.toLowerCase())
                .subscribe( image => {
                  crypto.image = 'data:image/png;base64,' + image;
                  var balanceCoin = this.portofolio.get(crypto.name.toLowerCase());
                  if (names.length === 1) {
                    this.listCards.push({ name: crypto.name, cols: 2, rows: 1, image: crypto.image, balance: balanceCoin });
                  } else {
                    this.listCards.push({ name: crypto.name, cols: 1, rows: 1, image: crypto.image, balance: balanceCoin });
                  }
                  this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
                    map(({ matches }) => {
                      return this.listCards;
                    })
                  );
                })
            });
            this.isDataAvailable = true;
          });
      });
  }

  removeCoinFromWallet(coinName: string): void {
    this.portofolio.delete(coinName);
    var jsonObject = {
      id: localStorage.getItem('id'),
      coins: this.portofolio
    }
    this.walletService.editUserPortofolio(jsonObject);
  } 
}
