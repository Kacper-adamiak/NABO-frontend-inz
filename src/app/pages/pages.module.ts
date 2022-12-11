import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from "./auth/auth.module";
import {StartingPageComponent} from "./starting-page/starting-page.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialExampleModule} from "../../material.module";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {AfterSigninModule} from "./after-signin/after-signin.module";
import {ResetPasswordPageComponent} from './reset-password-page/reset-password-page.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    StartingPageComponent,
    ResetPasswordPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    ButtonModule,
    ToastModule,
    AuthModule,
    AfterSigninModule,
    SharedModule,
    FormsModule
  ]
})
export class PagesModule { }
