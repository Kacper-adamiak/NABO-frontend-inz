import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CourseService} from "../../../services/course/course.service";
import {Course} from "../../../models/course";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {finalize} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";

@Component({
  selector: 'app-course-general-page',
  templateUrl: './course-general-page.component.html',
  styleUrls: ['./course-general-page.component.scss']
})
export class CourseGeneralPageComponent implements OnInit {

  prevData = {} as Course
  actualData = {} as Course
  name = new FormControl('', [Validators.required])
  description = new FormControl('', [Validators.required])
  courseId!: number

  constructor(
    public dialog: MatDialog,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    if(!!this.courseId){
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (res: HttpResponse<Course>) => {
          const body = res.body!
          this.actualData = JSON.parse(JSON.stringify(body))
          this.prevData = JSON.parse(JSON.stringify(body))
          this.name.setValue(this.actualData.name)
          this.description.setValue(this.actualData.description)
        },
        error: error => {
          this.snackBarService.openSnackBar(error.error.message)
          this.router.navigate(["/home/courses"])
        }
        })
    }
  }



  onSubmit() {
    this.actualData.name = this.name.value
    this.actualData.description = this.description.value
    console.log("act",this.actualData)
    console.log("prev",this.prevData)
    this.openDialog()
  }

  deleteCourse(){
    if(this.prevData.id){
      this.courseService.deleteCourseById(this.prevData.id).subscribe(
        {
          next: (res) => {
            this.snackBarService.openSuccessSnackBar(res.body.message)
            this.router.navigate(["/home/courses"])
          },
          error: (err) => {
            console.log("error: ", err)
          }
        }
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '50%',
      data: {prevData: this.prevData, actualData: this.actualData},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./dialog-overview-example-dialog.scss']
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private courseService: CourseService,
    private snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: {prevData: Course, actualData: Course},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    console.log("dialog: ",this.data.actualData)
    this.courseService.editCourseById(this.data.actualData.id!, this.data.actualData).subscribe({
      next: (res) => {
        this.snackBarService.openSuccessSnackBar(res.body.message)
      },
      error: (err) => {
        console.log("error: ", err)
        if(err.error.name) {
          this.snackBarService.openErrorSnackBar(err.error.name)
        }
        if(err.error.description) {
          this.snackBarService.openErrorSnackBar(err.error.description)
        }
        if(err.error.statusName) {
          this.snackBarService.openErrorSnackBar(err.error.statusName)
        }

      }
    })
    this.dialogRef.close();
  }
}
