import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SpinnerDialogComponent} from "./spinner-dialog/spinner-dialog.component";
import {UploadImageDialogComponent} from "../../shared/dialogs/upload-image-dialog/upload-image-dialog.component";
import {ImagePickerComponent} from "../../shared/dialogs/image-picker-dialog/image-picker.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openSpinner() {
    const dialogRef = this.dialog.open(SpinnerDialogComponent, {
      width: '100%',
      height: '100%',
      disableClose: true,
      panelClass: "transparent"
    });

    // dialogRef.afterClosed().subscribe(result =>  {
    //   console.log(`The dialog was closed ${result}`);
    // });

    return dialogRef
  }

  openUploadImage() {
    const dialogRef = this.dialog.open(UploadImageDialogComponent, {
      width: '50%',
      height: 'fit-content',
    });

    return dialogRef
  }

  openImagePicker() {
    const dialogRef = this.dialog.open(ImagePickerComponent, {
      width: '70%',
      height: '80%',
    });

    return dialogRef
  }
}
