import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WalletService {
    constructor(private http: HttpClient) { }

    getUserPortofolio(id: string): Observable<any> {
        return this.http.get('http://localhost:5000/cryk/api/getPortfolio/' + id);
    }
    
    editUserPortofolio(jsonObject: any): Observable<any> {
        return this.http.post('http://localhost:5000/cryk/api/insertPortfolio', JSON.stringify(jsonObject), { responseType: 'json' });
    }

    getPortofolioCryptoDetails(names: string[]): Observable<any> {
        return this.http.post('http://localhost:5001/ontology/api/cryptocurrenciesByName',  {coins: names});
    }

    getPortoCryptoDetails(format: string, names: string[]): Observable<any> {
        return this.http.post('http://localhost:5001/ontology/api/' + format + '/getCryptocurrenciesByName',  {coins: names}, { responseType: 'text' });
    }

    getCryptoCoinImageByName(name: string): Observable<any>{
        return this.http.get('http://localhost:5000/cryk/api/getImage/'+ name, {responseType: 'text'});
    }
}