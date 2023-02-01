import { AuthService } from './shared-services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'CRYK';

  constructor(readonly authService: AuthService){}
}
