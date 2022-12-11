import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialExampleModule} from 'src/material.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {CommonModule} from "@angular/common";
import {SharedModule} from "./shared/shared.module";
import {PagesModule} from "./pages/pages.module";
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import {NoopScrollStrategy} from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    SharedModule,
    PagesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500} },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {scrollStrategy: new NoopScrollStrategy()}}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
