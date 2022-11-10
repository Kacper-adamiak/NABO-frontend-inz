import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CourseService} from "../../../services/course/course.service";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";
import {Course} from "../../../models/course";

@Component({
  selector: 'app-image-picker-dialog',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent {

  image!: string

  constructor(
    public dialogRef: MatDialogRef<ImagePickerComponent>,
    private courseService: CourseService,
    private snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    console.log("dialog: ", this.data)
  }
}
