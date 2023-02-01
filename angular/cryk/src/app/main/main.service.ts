import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared-models/user.model';

@Injectable()
export class MainService {
    
    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    login(user: User): Observable<any> {
        const headers = { 'Id': user.id };
        return this.http.post('http://localhost:5000/cryk/api/login', { email: user.email, password: user.password });
    }

    loginWithGoogle(tokenGoogle: any): Observable<any> {
        return this.http.post('http://localhost:5000/cryk/auth', { token: tokenGoogle });
    }

    register(user: User): Observable<any> {
        const headers = { 'Id': user.id };
        return this.http.post('http://localhost:5000/cryk/api/register', { email: user.email, password: user.password });
    }

    logout(): Observable<any> {
        return this.http.get('http://localhost:5000/cryk/api/logout');
    }
}