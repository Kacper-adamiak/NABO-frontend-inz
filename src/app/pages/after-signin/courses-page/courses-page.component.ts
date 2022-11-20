import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Course} from 'src/app/models/course';
import {CourseService} from 'src/app/services/course/course.service';
import {NewCourseDialogComponent} from "./new-course-dialog/new-course-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DialogService} from "../../../services/dialog/dialog.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})

export class CoursesPageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ["name", "categoryName", "statusName", 'modified', 'created' ];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>([] as Course[])

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private courseServ: CourseService,
              public dialog: MatDialog,
              public dialogService: DialogService,
              public authService: AuthService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getCourses();
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.categoryName.toLowerCase().includes(filter) || data.statusName.toLowerCase().includes(filter);
    };

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
    this.authService.isSuperAdmin$.subscribe({
      next: value => {
        if(value) {
          this.displayedColumns.push('authorLogin')
          this.getCoursesForSuperAdmin()
        }
        else {
          this.getCoursesForAdmin()
        }
      }
    })


  }

  getCoursesForSuperAdmin() {
    let spinner = this.dialogService.openSpinner()
    this.courseServ.getAllCourses().subscribe({
      next: res => {
        this.dataSource.data = res
      },
      error: err => {
        spinner.close()
      },
      complete: () => {
        spinner.close()
      }
    })
  }

  getCoursesForAdmin() {
    let spinner = this.dialogService.openSpinner()
    this.courseServ.getCoursesCreatedByAdmin().subscribe({
      next: res => {
        this.dataSource.data = res
      },
      error: err => {
        spinner.close()
      },
      complete: () => {
        spinner.close()
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewCourseDialogComponent, {
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result =>  {
      console.log(`The dialog was closed ${result}`);
    });
  }



}
