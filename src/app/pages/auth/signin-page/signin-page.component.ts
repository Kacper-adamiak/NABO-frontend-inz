import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmit() {
    alert(`${this.loginForm.value['email']} ${this.loginForm.value['password']}`);
    this.authService.signin(this.loginForm.value['email'], this.loginForm.value['password']);
  }

}
