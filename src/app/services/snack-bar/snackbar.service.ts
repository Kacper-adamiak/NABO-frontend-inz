import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {SuccessSnackbarComponent} from "./templates/success-snackbar/success-snackbar.component";
import {ErrorSnackbarComponent} from "./templates/error-snackbar/error-snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(callback: string) {
    this._snackBar.open(callback,'', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openSuccessSnackBar(message: string) {
    this._snackBar.openFromComponent(SuccessSnackbarComponent, {
      data: message,
      panelClass: 'snackbar_success'
    })
  }

  openErrorSnackBar(message: string) {
    this._snackBar.openFromComponent(ErrorSnackbarComponent, {
      data: message,
      panelClass: 'snackbar_error'
    })
  }

}
