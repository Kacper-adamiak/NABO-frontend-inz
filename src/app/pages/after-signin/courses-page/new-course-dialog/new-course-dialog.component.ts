import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CourseService} from "../../../../services/course.service";
import {SnackbarService} from "../../../../services/snackbar.service";
import {Course} from "../../../../models/course";
import {UntypedFormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Category} from "../../../../models/category";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-new-course-dialog',
  templateUrl: './new-course-dialog.component.html',
  styleUrls: ['./new-course-dialog.component.scss']
})

export class NewCourseDialogComponent implements OnInit {

  newCourse = {} as Course
  name = new UntypedFormControl('', [Validators.required])
  description = new UntypedFormControl('', [Validators.required])
  category = new UntypedFormControl('', [Validators.required])
  categories = [] as Category[]

  constructor(
    public dialogRef: MatDialogRef<NewCourseDialogComponent>,
    private courseService: CourseService,
    private snackBarService: SnackbarService,
    private router: Router,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: res => {
        this.categories = res
      },
      error: err => {
        console.log(err)
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    this.newCourse.name = this.name.value
    this.newCourse.description = this.description.value
    this.newCourse.categoryName = this.category.value
    console.log(this.newCourse)
    this.courseService.addCourse(this.newCourse).subscribe({
      next: res => {
        console.log("courseadd", res)
        let tempCourse: Course = res.course!;
        if (tempCourse) {
          this.router.navigate(['/home/courses', `${tempCourse!.id}`])
        }
      },
      error: err => {
        console.log(err)
        this.snackBarService.openErrorSnackBar(err.error)
      }
    })
    this.dialogRef.close()
  }

}
