import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main.component';
import { MainService } from './main.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MainService],
  exports: [LoginComponent, RegisterComponent, MainComponent], 
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MainModule { }
