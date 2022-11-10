import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CourseService} from "../../../services/course/course.service";
import {Course} from "../../../models/course";
import {ActivatedRoute, Router} from "@angular/router";
import {UntypedFormControl, Validators} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";
import {DialogService} from "../../../services/dialog/dialog.service";

@Component({
  selector: 'app-course-general-page',
  templateUrl: './course-general-page.component.html',
  styleUrls: ['./course-general-page.component.scss']
})
export class CourseGeneralPageComponent implements OnInit {

  prevData = {} as Course
  editedData = {} as Course
  name = new UntypedFormControl('', [Validators.required])
  description = new UntypedFormControl('', [Validators.required])
  courseId!: number

  constructor(
    public dialog: MatDialog,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    if(!!this.courseId){
      const spinner = this.dialogService.openSpinner()
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (res: HttpResponse<Course>) => {
          const body = res.body!

          this.editedData = JSON.parse(JSON.stringify(body))
          this.prevData = JSON.parse(JSON.stringify(body))

          this.name.setValue(this.editedData.name)
          this.description.setValue(this.editedData.description)
        },
        error: error => {
          this.snackBarService.openSnackBar(error.error.message)
          this.router.navigate(["/home/courses"])
        },
        complete: () => {
          spinner.close()
        }
      })
    }
  }



  onSubmit() {
    this.editedData.name = this.name.value
    this.editedData.description = this.description.value
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
      data: {prevData: this.prevData, editedData: this.editedData},
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
    @Inject(MAT_DIALOG_DATA) public data: {prevData: Course, editedData: Course},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    console.log("dialog: ",this.data.editedData)
    this.courseService.editCourseById(this.data.editedData.id!, this.data.editedData).subscribe({
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
