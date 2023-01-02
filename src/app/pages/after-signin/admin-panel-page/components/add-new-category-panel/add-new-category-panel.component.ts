import {Component, OnInit} from '@angular/core';
import {PotentialCategoryService} from "../../../../../services/potential-category.service";
import {CategoryService} from "../../../../../services/category.service";
import {SnackbarService} from "../../../../../services/snackbar.service";
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
