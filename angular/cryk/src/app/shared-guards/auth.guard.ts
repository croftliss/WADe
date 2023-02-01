import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (this.isLoggedIn()) {
      return true;
    }
    // navigate to login page as user is not authenticated
    this.router.navigate(['']);
    return false;
  }
  
  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('isLoggedIn') == 'true') {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
}
