import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CourseService} from "../../../../services/course.service";
import {SnackbarService} from "../../../../services/snackbar.service";
import {Course} from "../../../../models/course";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
  categories = [] as Category[]

  courseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.min(2), Validators.max(240)]),
    category: new FormControl('', [Validators.required]),
  })

  constructor(
    public dialogRef: MatDialogRef<NewCourseDialogComponent>,
    private courseService: CourseService,
    private snackBarService: SnackbarService,
    private router: Router,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: res => {
        this.categories = res
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    this.getNewCourseFromForm()
    this.addNewCourse()
  }

  getNewCourseFromForm() {
    this.newCourse.name = this.courseForm.controls['name'].value!
    this.newCourse.description = this.courseForm.controls['description'].value!
    this.newCourse.categoryName = this.courseForm.controls['category'].value!
  }

  addNewCourse() {
    this.courseService.addCourse(this.newCourse).subscribe({
      next: res => {
        let tempCourse: Course = res.course!;
        if (tempCourse) {
          this.dialogRef.close()
          this.router.navigate(['/home/courses', `${tempCourse!.id}`])
        }
      },
      error: err => {
        this.snackBarService.openErrorSnackBar(err.error)
      }
    })
  }

}
