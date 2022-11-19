import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from "./auth/auth.module";
import {AfterSigninModule} from "./after-signin/after-signin.module";
import {StartingPageComponent} from "./starting-page/starting-page.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialExampleModule} from "../../material.module";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    StartingPageComponent
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
        AuthModule,
        AfterSigninModule,
        ButtonModule,
        ToastModule
    ]
})
export class PagesModule { }
