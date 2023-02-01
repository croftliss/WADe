import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { CryptoCurrency } from '../../shared-models/crypto-currency.model';
import { CryptoCurrencyDataSource } from './crypto-currency-datasource';
import { CryptoCurrencyService } from './crypto-currency.service';
import { CryptoDetails } from 'src/app/shared-models/crypto-details.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ExtensionsService } from 'src/app/shared-services/extensions.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-crypto-currency',
  templateUrl: './crypto-currency.component.html',
  styleUrls: ['./crypto-currency.component.scss'],
})
export class CryptoCurrencyComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CryptoCurrency>;
  isDataAvailable: boolean = false;
  cryptoDetails: CryptoDetails = new CryptoDetails();
  dataSource: CryptoCurrencyDataSource;
  viewMode = 'json-ld';
  htmlRdfaResult: string;
  displayedColumns = [
    'id',
    'image',
    'name',
    'symbol',
    'description',
    'date_founded',
    'total_coins',
    'details',
  ];

  constructor(
    private cryptoService: CryptoCurrencyService,
    private navService: NavService,
    private sanitizer: DomSanitizer,
    private extensions: ExtensionsService
  ) {
    this.dataSource = new CryptoCurrencyDataSource();
  }

  ngAfterViewInit(): void {
    this.prepareDataSourceJsonLd();
    this.prepareDataSourceHrmlRdfa();
  }

  private prepareDataSourceJsonLd(): void {
    this.cryptoService.getAllCryto('json-ld').subscribe((data) => {
      this.cryptoDetails.cryptos = this.extensions.convertJsonLdToCryptoObjects(data);
    });
    this.navService.getCryptoDictionary().subscribe((jsonObject) => {
      this.cryptoDetails.cryptoDict = new Map<string, string>();
      for (var value in jsonObject) {
        this.cryptoDetails.cryptoDict.set(value, jsonObject[value]);
      }
      var listCoinNames = [];
      for (let key in jsonObject) {
        listCoinNames.push(key);
      }
      this.navService.getCryptoImages(listCoinNames).subscribe((data) => {
        this.cryptoDetails.cryptoImages = new Map<string, string>();
        for (var value in data) {
          this.cryptoDetails.cryptoImages.set(value, data[value]);
        }
        this.setImageForEachCoin(
          this.cryptoDetails.cryptos,
          this.cryptoDetails.cryptoImages
        );
        this.dataSource.data = [...this.cryptoDetails.cryptos];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //this.table.dataSource = this.dataSource; // solve this for pagination
        this.isDataAvailable = true;
      });
    });
    this.dataSource.data = [];
    this.isDataAvailable = true;
  }

  private prepareDataSourceHrmlRdfa(): void {
    this.cryptoService.getAllCryto('html-rdfa').subscribe((data) => {
      this.htmlRdfaResult = data;
    });
  }

  private setImageForEachCoin(
    cryptos: CryptoCurrency[],
    cryptoImages: Map<string, string>
  ): void {
    cryptos.forEach((crypto) => {
      if (cryptoImages.has(crypto.name?.toLowerCase())) {
        var cryptoImageBase64 = cryptoImages.get(crypto.name.toLowerCase());
        crypto.image = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/png;base64,' + cryptoImageBase64
        );
      }
    });
  }
}
