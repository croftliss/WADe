import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CryptoCurrency } from 'src/app/shared-models/crypto-currency.model';
import { CryptoDetailsService } from './crypto-details.service';

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.scss']
})
export class CryptoDetailsComponent implements OnInit {
  selectedCoin: CryptoCurrency;
  isDataAvailable: boolean = false;

  constructor(private route: ActivatedRoute,
    private readonly service: CryptoDetailsService)  {
      this.selectedCoin = new CryptoCurrency();
    }

  ngOnInit(): void {
    var coinName = this.route.snapshot.params['name'].toLowerCase();
    this.service.getCryptoCoinByName(coinName)
      .subscribe( data => {
        if (data != null) {
          this.selectedCoin = data[0];
          this.service.getCryptoCoinImageByName(coinName)
            .subscribe( image => {
              this.selectedCoin.image = 'data:image/png;base64,' + image;
              this.isDataAvailable = true;
            });
        }
      });
  }
}
