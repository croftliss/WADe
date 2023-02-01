import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Profile } from '../../shared-models/profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isDataAvailable = false;
  form: FormGroup = new FormGroup({});

  constructor(private profileService: ProfileService, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('id')
    this.profileService.getUserProfile(userId ?? '')
      .subscribe( profile => {
        this.form = this.fb.group({
          username: [profile.username, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
          email: [profile.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
          address: [profile.address, [Validators.required, Validators.minLength(1)]],
          country: [profile.country, [Validators.required]],
          city: [profile.city, [Validators.required]],
          firstname: [profile.firstname, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
          lastname: [profile.lastname, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
          about: [profile.about]
        });
        this.isDataAvailable = true;
      });
  }

  saveDetails(form: any) {
    const userId = localStorage.getItem('id')
    var profile = {
      id: userId,
      username: form.value.username,
      email: form.value.email,
      address: form.value.address,
      country: form.value.country,
      city: form.value.city,
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      about: form.value.about
    } as Profile
    this.profileService.editUserProfile(profile)
      .subscribe( data => {
        console.log(data);
        this.profileService.getUserProfile(userId ?? '')
          .subscribe( profile => {
            this.form.setValue({
              username: profile.username,
              email: profile.email,
              address: profile.address,
              country: profile.country,
              city: profile.city,
              firstname: profile.firstname, 
              lastname: profile.lastname,
              about: profile.about
            });
          });
      });
  }

  isFormValid(): boolean {
    if(this.form.valid){
      return true;
    }
    return false;
  }
}
