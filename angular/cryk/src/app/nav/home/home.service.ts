import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class HomeService {
    constructor(private http: HttpClient) {
    }

    getCurrentPriceForCoin(coinName: string): Observable<any> {
        return this.http.get('http://localhost:5000/cryk/api/getCurrentPriceForCoin/' + coinName);
    }

    getCryptoCoinImageByName(coinName: string): Observable<any>{
        return this.http.get('http://localhost:5000/cryk/api/getImage/'+ coinName, {responseType: 'text'});
    }
}