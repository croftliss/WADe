import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/shared-models/profile.model';

@Injectable()
export class ProfileService {

    constructor(private http: HttpClient) { }

    getUserProfile(id: string): Observable<any> {
        return this.http.get('http://localhost:5000/cryk/api/getProfile/' + id);
    }
    
    // TODO problema la trimiterea obiectului
    editUserProfile(profile: Profile): Observable<any> {
        return this.http.post('http://localhost:5000/cryk/api/insertProfile', JSON.stringify(profile), { responseType: 'json' });
    }
}