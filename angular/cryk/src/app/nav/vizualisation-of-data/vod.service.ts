import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class VodService {
    constructor(private http: HttpClient) {
    }

    getCurrentPriceForCoin(coinName: string): Observable<any> {
        return this.http.get('http://localhost:5000/cryk/api/getHistoricalPriceForCoin?coin=' + coinName + '&days=5');
    }

    getCryptoDictionary(): Observable<any> {
        return this.http.get('http://localhost:5000/cryk/api/cryptocurrencies/dictionary');
    }
}