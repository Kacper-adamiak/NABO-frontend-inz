import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, Observable, Observer, tap } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import {NewCourseDialogComponent} from "./new-course-dialog/new-course-dialog.component";
import {DialogOverviewExampleDialog} from "../course-general-page/course-general-page.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})

export class CoursesPageComponent implements OnInit {

  data!: Course[];

  filterValue = new FormControl('');

  constructor(private courseServ: CourseService, public dialog: MatDialog) {
    this.getCourses();
  }

  ngOnInit(): void {

  }

  getCourses() {
    this.courseServ.getCoursesCreatedByAdmin().subscribe((res) => this.data = res.body!)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewCourseDialogComponent, {
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCourses();
      console.log('The dialog was closed');
    });
  }

  addNewCourse() {
    this.openDialog()
  }



}
