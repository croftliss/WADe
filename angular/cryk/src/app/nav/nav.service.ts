import { BehaviorSubject } from 'rxjs';
import { CryptoDetails } from '../shared-models/crypto-details.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class NavService {
    cryptoDetailsToBeSent: BehaviorSubject<CryptoDetails>;
    cryptoDetails = new CryptoDetails();

    constructor(private http: HttpClient) {
        this.cryptoDetailsToBeSent = new BehaviorSubject<CryptoDetails>(this.cryptoDetails);
    }

    getAllCryto(): Observable<any> {
        return this.http.get('http://localhost:5001/ontology/api/cryptocurrencies');
    }

    getCryptoDictionary(): Observable<any> {
        return this.http.get('http://localhost:5000/cryk/api/cryptocurrencies/dictionary');
    }

    getCryptoImages(listCoinNames: string[]): Observable<any> {
        return this.http.post('http://localhost:5000/cryk/api/getImages', { images: listCoinNames });
    }
}