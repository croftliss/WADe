import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  @Output() userLogsIn = new EventEmitter<any>();
  isUserRegistered = false;
  constructor() { }

  ngOnInit(): void {
  }

  switchPage(): void {
    this.isUserRegistered = !this.isUserRegistered;
  }

  userLoggingIn(userData: any): void {
    console.log(userData);
    this.userLogsIn.emit(userData);
  }
}
