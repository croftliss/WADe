import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared-models/user.model';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @Output() switchPage = new EventEmitter();
  form!: FormGroup;

  constructor(private mainService: MainService, 
    private formBuilder: FormBuilder,
    private router : Router, 
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
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
      document.getElementById("buttonGoogle"),
      { size: "large", type: "icon", shape: "pill" }
    );
  }

  onLogin(): void {
    var user = {
      email: this.form.value.email,
      password: this.form.value.password
    } as User;
    //const bcrypt = require('bcrypt');
    const saltRounds = 10;
    var err : any;
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //   bcrypt.hash(user.password, salt, function(err, hash) {
    //   // returns hash
    //   console.log(hash);
    //   });
    // });
    //user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    this.mainService.login(user)
      .subscribe(data => {
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
