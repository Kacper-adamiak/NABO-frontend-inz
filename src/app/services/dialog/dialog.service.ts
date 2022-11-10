import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewLevelDialogComponent} from "../../pages/after-signin/levels-page/new-level-dialog/new-level-dialog.component";
import {SpinnerDialogComponent} from "./spinner-dialog/spinner-dialog.component";
import {UploadImageDialogComponent} from "../../shared/dialogs/upload-image-dialog/upload-image-dialog.component";

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
      width: '90%',
      height: '90%',
    });

    return dialogRef
  }
}
