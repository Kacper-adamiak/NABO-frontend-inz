import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmit() {
    alert(`${this.loginForm.value['password']}`);
  }

}
