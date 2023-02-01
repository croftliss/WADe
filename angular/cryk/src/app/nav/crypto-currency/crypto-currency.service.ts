import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CryptoCurrencyService {
    constructor(private http: HttpClient) { }

    getAllCryto(format: string): Observable<any> {
        return this.http.get('http://localhost:5001/ontology/api/' + format + '/getCryptocurrencies', { responseType: 'text' });
    }
}