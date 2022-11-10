import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AfterSigninModule} from './pages/after-signin/after-signin.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './pages/auth/auth.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialExampleModule} from 'src/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {StartingPageComponent} from './pages/starting-page/starting-page.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {SuccessSnackbarComponent} from './shared/snackbars/success-snackbar/success-snackbar.component';
import {ErrorSnackbarComponent} from './shared/snackbars/error-snackbar/error-snackbar.component';
import {SpinnerDialogComponent} from './services/dialog/spinner-dialog/spinner-dialog.component';
import {ImagePickerComponent} from './shared/dialogs/image-picker-dialog/image-picker.component';
import {UploadImageDialogComponent} from './shared/dialogs/upload-image-dialog/upload-image-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StartingPageComponent,
    SuccessSnackbarComponent,
    ErrorSnackbarComponent,
    SpinnerDialogComponent,
    ImagePickerComponent,
    UploadImageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    AuthModule,
    AfterSigninModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
