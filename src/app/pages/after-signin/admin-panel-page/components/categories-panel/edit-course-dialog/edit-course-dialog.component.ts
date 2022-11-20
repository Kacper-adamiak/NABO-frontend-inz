import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {Category} from "../../../../../../models/category";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../../../../services/category/category.service";

@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.scss']
})
export class EditCourseDialogComponent implements OnInit {

  editedCategory = {} as Category
  name = new UntypedFormControl('', [Validators.required])

  constructor(
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    public categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category },
  ) {}

  ngOnInit(): void {
    this.name.setValue(this.data.category.name)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onAccept() {
    this.categoryService.editCategory(this.data.category.id!, this.name.value).subscribe({
      next: value => {

      },
      error: err => {

      },
      complete: () => {

      }
    })
  }

}
