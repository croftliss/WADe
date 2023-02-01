import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SparqlService {
    constructor(private http: HttpClient) { }

    getSparqlResult(querySparql: string): Observable<any> {
        return this.http.post('http://localhost:5001/ontology/api/runQuery', { query: querySparql });
    }
}