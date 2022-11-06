import { HttpRequest, HttpResponse } from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, Observable, Observer, tap } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course/course.service';
import {NewCourseDialogComponent} from "./new-course-dialog/new-course-dialog.component";
import {DialogOverviewExampleDialog} from "../course-general-page/course-general-page.component";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})

export class CoursesPageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ["name", "category", "status", 'modified', 'created' ];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>([] as Course[])

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterValue = new FormControl('');

  constructor(private courseServ: CourseService, public dialog: MatDialog) {
    this.getCourses();
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.categoryName.toLowerCase().includes(filter) || data.statusName.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.trim().toLowerCase())

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCourses() {
    this.courseServ.getCoursesCreatedByAdmin().subscribe(
      res => {
        let data: Course[] = res.body!
        this.dataSource.data = data
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewCourseDialogComponent, {
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result =>  {
      console.log(`The dialog was closed ${result}`);
      this.getCourses();
    });
  }

  addNewCourse() {
    this.openDialog()
  }



}
