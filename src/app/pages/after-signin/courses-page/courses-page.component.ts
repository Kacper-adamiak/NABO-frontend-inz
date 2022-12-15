import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Course} from 'src/app/models/course';
import {CourseService} from 'src/app/services/course.service';
import {NewCourseDialogComponent} from "./new-course-dialog/new-course-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DialogService} from "../../../services/dialog.service";
import {AuthService} from "../../../services/auth.service";
import {
  NewPotentialCategoryDialogComponent
} from "./new-potential-category-dialog/new-potential-category-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingState} from "../../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})

export class CoursesPageComponent implements OnInit, AfterViewInit {

  dataState = new LoadingState()

  displayedColumns: string[] = ["name", "categoryName", "statusName", 'modified', 'created' ];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>([] as Course[])
  data: any[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private courseServ: CourseService,
              public dialog: MatDialog,
              public dialogService: DialogService,
              public authService: AuthService,
              private router: Router,
              private activeRoute: ActivatedRoute
  ) {
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
    this.authService.isAdmin$.subscribe({
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
    this.dataState.setLoading()
    this.courseServ.getAllCourses()
      .pipe(finalize(() => {
        this.dataState.setNotLoading()
      }))
      .subscribe({
      next: res => {
        this.dataSource.data = res
        this.data = res
      },
      error: err => {
      },
      complete: () => {
      }
    })
  }

  getCoursesForAdmin() {
    this.dataState.setLoading()
    this.courseServ.getCoursesCreatedByAdmin()
      .pipe(finalize(() => {
        this.dataState.setNotLoading()
      }))
      .subscribe({
      next: res => {
        this.dataSource.data = res
        this.data = res
      },
      error: err => {
      },
      complete: () => {
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewCourseDialogComponent, {
      width: '80%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result =>  {
      console.log(`The dialog was closed ${result}`);
    });
  }

  openNewPotentialCategoryDialog() {
    const dialogRef = this.dialog.open(NewPotentialCategoryDialogComponent, {
      width: '80%',
      height: 'fit-content',
    });

    dialogRef.afterClosed().subscribe(result =>  {
      console.log(`The dialog was closed ${result}`);
    });
  }


  rowClicked(event: any) {
      this.router.navigate([`${event.id}`], {relativeTo: this.activeRoute})
  }
}
