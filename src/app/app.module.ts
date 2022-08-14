import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterModule } from '@angular/router';
import { AfterSigninModule } from './after-signin/after-signin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AuthModule,
    AfterSigninModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
