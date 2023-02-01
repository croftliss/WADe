import { Injectable } from '@angular/core';

@Injectable({    
   providedIn: 'root'    
})    
export class AuthService {    
   constructor() { } 

   isAuthenticated(){
      return localStorage.getItem('isLoggedIn') == 'true';
   }

   logout() :void {    
    localStorage.setItem('isLoggedIn','false');  
    localStorage.removeItem('id'); 
    localStorage.removeItem('token');    
   }    
}   