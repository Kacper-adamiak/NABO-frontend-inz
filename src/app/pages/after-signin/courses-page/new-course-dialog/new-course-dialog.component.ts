import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CourseService} from "../../../../services/course.service";
import {SnackBarService} from "../../../../services/snack-bar.service";
import {Course} from "../../../../models/course";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-course-dialog',
  templateUrl: './new-course-dialog.component.html',
  styleUrls: ['./new-course-dialog.component.scss']
})

export class NewCourseDialogComponent implements OnInit {

  newCourse = {} as Course
  name = new FormControl('', [Validators.required])
  description = new FormControl('', [Validators.required])

  constructor(
    public dialogRef: MatDialogRef<NewCourseDialogComponent>,
    private courseService: CourseService,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    this.newCourse.name = this.name.value
    this.newCourse.description = this.description.value
    console.log(this.newCourse)
    this.courseService.addCourse(this.newCourse).subscribe()
    this.dialogRef.close()
  }

}
