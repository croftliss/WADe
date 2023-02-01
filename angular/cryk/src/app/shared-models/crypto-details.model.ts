import { CryptoCurrency } from "./crypto-currency.model";

export class CryptoDetails {
    cryptos: CryptoCurrency[] = [];
    cryptoDict = new Map<string, string>(); 
    cryptoImages = new Map<string, string>();
}