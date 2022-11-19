import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CourseService} from "../../../services/course/course.service";
import {Course} from "../../../models/course";
import {ActivatedRoute, Router} from "@angular/router";
import {UntypedFormControl, Validators} from "@angular/forms";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";
import {DialogService} from "../../../services/dialog/dialog.service";
import {CategoryService} from "../../../services/category/category.service";
import {Category} from "../../../models/category";

@Component({
  selector: 'app-course-general-page',
  templateUrl: './course-general-page.component.html',
  styleUrls: ['./course-general-page.component.scss']
})
export class CourseGeneralPageComponent implements OnInit {

  originalData = {} as Course
  editedData = {} as Course
  categories = [] as Category[]
  name = new UntypedFormControl('', [Validators.required])
  description = new UntypedFormControl('', [Validators.required])
  category = new UntypedFormControl('', [Validators.required])
  status = new UntypedFormControl('', [Validators.required])
  courseId!: number

  constructor(
    public dialog: MatDialog,
    private snackBarService: SnackbarService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.categoryService.getCategories().subscribe({
      next: res => {
        this.categories = res
      }
    })
  }

  ngOnInit(): void {

    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    if(!!this.courseId){
      const spinner = this.dialogService.openSpinner()
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (res: Course) => {
          const body = res

          this.editedData = JSON.parse(JSON.stringify(body))
          this.originalData = JSON.parse(JSON.stringify(body))

          this.setFromValues(this.editedData)
        },
        error: error => {
          spinner.close()
          this.snackBarService.openSnackBar(error.message)
          this.router.navigate(["/home/courses"])
        },
        complete: () => {
          spinner.close()
        }
      })
    }
  }

  setFromValues(course: Course) {
    this.name.setValue(course.name)
    this.description.setValue(course.description)
    this.category.setValue(course.categoryName)
    this.status.setValue(course.statusName)
  }

  onSubmit() {
    this.editedData.name = this.name.value
    this.editedData.description = this.description.value
    this.editedData.statusName = this.status.value
    this.openDialog()
  }

  deleteCourse(){
    if(this.originalData.id){
      this.courseService.deleteCourseById(this.originalData.id).subscribe(
        {
          next: (res) => {
            this.snackBarService.openSuccessSnackBar(res.message)
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
    const dialogRef = this.dialogService.openDataDiffDialog(this.originalData, this.editedData)

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.courseService.editCourseById(this.editedData.id!, this.editedData).subscribe({
          next: (res) => {
            this.snackBarService.openSuccessSnackBar(res.message)
          },
          error: (err) => {
            console.log("error: ", err)
            if(err.error.name) {
              this.snackBarService.openErrorSnackBar(err.name)
            }
            if(err.error.description) {
              this.snackBarService.openErrorSnackBar(err.description)
            }
            if(err.error.statusName) {
              this.snackBarService.openErrorSnackBar(err.statusName)
            }
          }
        })
        this.originalData = JSON.parse(JSON.stringify(this.editedData))
      }
      console.log('The dialog was closed');
    });
  }

}
