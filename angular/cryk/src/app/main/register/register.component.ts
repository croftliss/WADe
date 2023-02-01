import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared-models/user.model';

declare var google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @Output() switchPage = new EventEmitter();
  form: FormGroup = new FormGroup({});
  
  constructor(private mainService: MainService,
    private fb: FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "867040253924-5h7s214gns97mnsaiknd4t663nkpp0sh.apps.googleusercontent.com",
      callback: (response: any) => this.handleGoogleSignIn(response)
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonGoogle2"),
      { size: "large", type: "icon", shape: "pill" }
    );
  }

  onRegister(): void {
    var user = {
      email: this.form.value.email,
      password: this.form.value.password
    } as User;
    this.mainService.register(user)
      .subscribe( data => {
        localStorage.setItem('isLoggedIn', "true");  
        localStorage.setItem('id', data.id);
        localStorage.setItem('token', data.token);
        this.router.navigate(['/cryk']);
      });
  }

  onSwitchToRegister(): void {
    this.switchPage.emit();
  }

  private handleGoogleSignIn(response: any) {
    this.mainService.loginWithGoogle(response.credential)
      .subscribe( data => {
        localStorage.setItem('isLoggedIn', "true");  
        localStorage.setItem('id', data.id);
        localStorage.setItem('token', data.token);
        this.router.navigate(['/cryk']);
      });
  }
}
