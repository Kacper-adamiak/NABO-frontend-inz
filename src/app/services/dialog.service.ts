import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UploadImageDialogComponent} from "../shared/dialogs/upload-image-dialog/upload-image-dialog.component";
import {ImagePickerComponent} from "../shared/dialogs/image-picker-dialog/image-picker.component";
import {DataDifferenceDialogComponent} from "../shared/dialogs/data-difference-dialog/data-difference-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openUploadImage() {
    const dialogRef = this.dialog.open(UploadImageDialogComponent, {
      width: '90%',
      height: 'fit-content',
    });

    return dialogRef
  }

  openImagePicker() {
    const dialogRef = this.dialog.open(ImagePickerComponent, {
      width: '90%',
      height: '80%',
    });

    return dialogRef
  }

  openDataDiffDialog(_originalData: any, _editedData: any) {
    const dialogRef = this.dialog.open(DataDifferenceDialogComponent, {
      width: '90%',
      height: '80%',
      data: {
        originalData: _originalData,
        editedData: _editedData
      }
    });

    return dialogRef
  }
}
