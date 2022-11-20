import {Component, OnInit} from '@angular/core';
import {PotentialCategoryService} from "../../../../../services/potential-category/potential-category.service";
import {CategoryService} from "../../../../../services/category/category.service";
import {SnackbarService} from "../../../../../services/snack-bar/snackbar.service";
import {UntypedFormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-new-category-panel',
  templateUrl: './add-new-category-panel.component.html',
  styleUrls: ['./add-new-category-panel.component.scss']
})
export class AddNewCategoryPanelComponent implements OnInit {

  newCategoryForm = new UntypedFormControl('', [Validators.required])

  constructor(private potentialCategoryService: PotentialCategoryService,
              private categoryService: CategoryService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  addNewCategory(){

    this.categoryService.addCategory(this.newCategoryForm.value).subscribe({
      next: value => {
        console.log("added new category",value)
        this.snackbarService.openSuccessSnackBar(value.message)
      },
      error: err => {
        this.snackbarService.openErrorSnackBar(err.error)
      },
      complete: () => {

      }
    })
    this.newCategoryForm.reset('')
  }

}
