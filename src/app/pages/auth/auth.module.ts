import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MaterialExampleModule} from "../../../material.module";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    AuthComponent,
    SigninPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialExampleModule
  ]
})
export class AuthModule { }
