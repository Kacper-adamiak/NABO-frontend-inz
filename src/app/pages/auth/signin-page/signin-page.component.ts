import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {
  hide = true;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  email = new FormControl('')
  password = new FormControl('')

  onSubmit() {
    alert(`${this.email.value} ${this.password.value}`);
    this.authService.signin(this.email.value, this.password.value);
  }

}
