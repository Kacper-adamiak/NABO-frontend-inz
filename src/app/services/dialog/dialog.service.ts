import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewLevelDialogComponent} from "../../pages/after-signin/levels-page/new-level-dialog/new-level-dialog.component";
import {SpinnerDialogComponent} from "./spinner-dialog/spinner-dialog.component";

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
}
