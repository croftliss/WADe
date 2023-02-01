import { Component, OnInit } from '@angular/core';

import { VodService } from './vod.service';

@Component({
  selector: 'app-vizualisation-of-data',
  templateUrl: './vizualisation-of-data.component.html',
  styleUrls: ['./vizualisation-of-data.component.scss']
})
export class VisualizationOfDataComponent implements OnInit {
  isDataAvailable = false;
  isDataAvailableForFirstCoin = false;
  isDataAvailableForSecondCoin = false;
  firstCoinName: string;
  secondCoinName: string;
  coinNames: string[] = [];
  multiFirst: any[] = [];
  multiSecond: any[] = [];

  constructor(private readonly vodService: VodService) { }

  ngOnInit(): void {
    this.vodService.getCryptoDictionary()
      .subscribe(data => {
        for (var value in data) {
          this.coinNames.push(value);
        }
        this.isDataAvailable = true;
      })
  }

  selectFirstChange() {
    this.vodService.getCurrentPriceForCoin(this.firstCoinName)
      .subscribe( data => {
        var copyData = JSON.parse(JSON.stringify(data));
        this.multiFirst.push(this.convert(data, 'usd'));
        this.multiFirst.push(this.convert(copyData, 'eur'));
        this.isDataAvailableForFirstCoin = true;
      });
  }

  selectSecondChange() {
    this.vodService.getCurrentPriceForCoin(this.secondCoinName)
      .subscribe( data => {
        var copyData = JSON.parse(JSON.stringify(data));
        this.multiSecond.push(this.convert(data, 'usd'));
        this.multiSecond.push(this.convert(copyData, 'eur'));
        this.isDataAvailableForSecondCoin = true;
      });
  }

  private convert(json: any, key: string): any{
    json.name = key
    json.series = json.prices
    delete json.prices
    for (let i = 0; i < json.series.length; i++) {
        json.series[i].name = json.series[i].date
        delete json.series[i].date
        json.series[i].value = json.series[i][key]
        delete json.series[i].eur
        delete json.series[i].usd
    }
    return json;
  }
}
