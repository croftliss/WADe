import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CryptoDetailsService {

    constructor(private http: HttpClient) { }
    
    getCryptoCoinByName(name: string): Observable<any>{
        return this.http.get('http://localhost:5001/ontology/api/cryptocurrencyByName/'+ name);
    }

    getCryptoCoinImageByName(name: string): Observable<any>{
        return this.http.get('http://localhost:5000/cryk/api/getImage/'+ name, {responseType: 'text'});
    }
}