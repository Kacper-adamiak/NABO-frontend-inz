import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SuccessSnackbarComponent} from "../shared/snackbars/success-snackbar/success-snackbar.component";
import {ErrorSnackbarComponent} from "../shared/snackbars/error-snackbar/error-snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(callback: string) {
    this._snackBar.open(callback,'', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  openSuccessSnackBar(message: string) {
    this._snackBar.openFromComponent(SuccessSnackbarComponent, {
      data: message,
      panelClass: 'snackbar_success',
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }

  openErrorSnackBar(message: string) {
    this._snackBar.openFromComponent(ErrorSnackbarComponent, {
      data: message,
      panelClass: 'snackbar_error',
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }

}
