import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '../shared-services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() userId: string;
  menuItems = ['profile', 'wallet', 'cryptocurrencies', 'sparql', 'visualization-of-data'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, 
    private authService: AuthService) {}

  ngOnInit(): void {
  }

  logOut(): void{
    this.authService.logout();
  }
}
