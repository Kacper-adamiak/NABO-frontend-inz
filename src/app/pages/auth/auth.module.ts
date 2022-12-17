import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {SigninPageComponent} from './signin-page/signin-page.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialExampleModule} from "../../../material.module";
import {ForgotPasswordComponent} from '../auth/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AuthComponent,
    SigninPageComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialExampleModule
  ]
})
export class AuthModule { }
