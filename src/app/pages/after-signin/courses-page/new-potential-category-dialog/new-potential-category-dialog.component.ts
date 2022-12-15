import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {PotentialCategoryService} from "../../../../services/potential-category.service";
import {SnackbarService} from "../../../../services/snackbar.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-potential-category-dialog',
  templateUrl: './new-potential-category-dialog.component.html',
  styleUrls: ['./new-potential-category-dialog.component.scss']
})
export class NewPotentialCategoryDialogComponent implements OnInit {
  newCategoryForm = new UntypedFormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<NewPotentialCategoryDialogComponent>,
    private potentialCategoryService: PotentialCategoryService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  addNewPotentialCategory() {
    this.potentialCategoryService.addPotentialCategory(this.newCategoryForm.value).subscribe({
      next: value => {
        this.snackbarService.openSuccessSnackBar(value.message)
        this.dialogRef.close(true)
      },
      error: err => {
        this.snackbarService.openErrorSnackBar(err.error)
        this.dialogRef.close(false)
      }
    })
  }

  onNoClick() {
    this.dialogRef.close(false)
  }
}
