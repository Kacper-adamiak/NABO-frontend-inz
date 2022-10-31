import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../models/course";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-general-page',
  templateUrl: './course-general-page.component.html',
  styleUrls: ['./course-general-page.component.scss']
})
export class CourseGeneralPageComponent implements OnInit {

  prevData = {} as Course
  actualData = {} as Course
  courseId!: number

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'))
    if(!!this.courseId){
      this.courseService.getCourseById(this.courseId).subscribe(
        res => {
          this.actualData = res.body!
          this.prevData = res.body!
        }
      )
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
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
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {prevData: Course, actualData: Course},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    console.log("accepted");
    this.dialogRef.close();
  }
}
