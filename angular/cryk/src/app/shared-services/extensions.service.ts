import { CryptoCurrency } from '../shared-models/crypto-currency.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})    
export class ExtensionsService {    
   constructor() { } 

   convertJsonLdToCryptoObjects(data: any): CryptoCurrency[] {
    var json = JSON.parse(data);
    var objArray = [];

    for (var i = 0; i < json.length; i++) {
      var obj = json[i];
      var cryptoObj = {} as CryptoCurrency;

      for (var key in obj) {
        var value = obj[key];
        switch (key) {
          case '@id':
            cryptoObj.id = obj[key].split('#')[1];
            break;
          case '@type':
            break;
          case 'http://purl.org/dc/elements/1.1/description':
            cryptoObj.description = obj[key][0]['@value'];
            break;
          default:
            var cryptoObjKey = key.split('#')[1];
            let cryptoObjVal = obj[key][0]['@value'];
            if (!cryptoObjVal) {
              cryptoObjVal = obj[key][0]['@id'];
            }
            if (cryptoObjKey === 'prefLabel') {
              cryptoObj.name = cryptoObjVal;
            } else if (cryptoObjKey === 'block_time') {
              cryptoObj.block_time = cryptoObjVal;
            } else if (cryptoObjKey === 'date_founded') {
              cryptoObj.date_founded = cryptoObjVal;
            } else if (cryptoObjKey === 'incept') {
              cryptoObj.incept = cryptoObjVal;
            } else if (cryptoObjKey === 'proof_of_stake') {
              cryptoObj.proof_of_stake = cryptoObjVal;
            } else if (cryptoObjKey === 'proof_of_work') {
              cryptoObj.proof_of_work = cryptoObjVal;
            } else if (cryptoObjKey === 'premine') {
              cryptoObj.premine = cryptoObjVal;
            } else if (cryptoObjKey === 'protection_scheme') {
              cryptoObj.protection_scheme = cryptoObjVal;
            } else if (cryptoObjKey === 'protocol') {
              cryptoObj.protocol = cryptoObjVal;
            } else if (cryptoObjKey === 'retarget_time') {
              cryptoObj.retarget_time = cryptoObjVal;
            } else if (cryptoObjKey === 'source') {
              cryptoObj.source = cryptoObjVal;
            } else if (cryptoObjKey === 'symbol') {
              cryptoObj.symbol = cryptoObjVal;
            } else if (cryptoObjKey === 'total_coins') {
              cryptoObj.total_coins = cryptoObjVal;
            } else if (cryptoObjKey === 'website') {
              cryptoObj.website = cryptoObjVal;
            }
        }
      }
      objArray.push(cryptoObj);
    }
    return objArray;
  }
}   