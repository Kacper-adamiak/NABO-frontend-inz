import {Component, OnInit} from '@angular/core';
import {Course} from 'src/app/models/course';
import {CourseService} from 'src/app/services/course.service';
import {NewCourseDialogComponent} from "./new-course-dialog/new-course-dialog.component";
import {MatDialog} from "@angular/material/dialog";
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

export class CoursesPageComponent implements OnInit {

  dataState = new LoadingState()

  displayedColumns: string[] = ["name", "categoryName", "statusName", 'modified', 'created' ];
  data: Course[] = []

  constructor(private courseServ: CourseService,
              public dialog: MatDialog,
              public dialogService: DialogService,
              public authService: AuthService,
              private router: Router,
              private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getCourses();
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
        this.data = res
      },
      error: err => {
      },
      complete: () => {
      }
    })
  }

  openNewCourseDialog(): void {
    const dialogRef = this.dialog.open(NewCourseDialogComponent, {
      width: '80%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result =>  {
    });
  }

  openNewPotentialCategoryDialog() {
    const dialogRef = this.dialog.open(NewPotentialCategoryDialogComponent, {
      width: '80%',
      height: 'fit-content',
    });

    dialogRef.afterClosed().subscribe(result =>  {
    });
  }


  rowClicked(event: any) {
      this.router.navigate([`${event.id}`], {relativeTo: this.activeRoute})
  }
}
