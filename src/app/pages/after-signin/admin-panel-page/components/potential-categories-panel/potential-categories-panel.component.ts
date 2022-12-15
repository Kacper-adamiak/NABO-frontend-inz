import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PotentialCategory} from "../../../../../models/potential-category";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PotentialCategoryService} from "../../../../../services/potential-category.service";
import {CategoryService} from "../../../../../services/category.service";
import {SnackbarService} from "../../../../../services/snackbar.service";

@Component({
  selector: 'app-potential-categories-panel',
  templateUrl: './potential-categories-panel.component.html',
  styleUrls: ['./potential-categories-panel.component.scss']
})
export class PotentialCategoriesPanelComponent implements OnInit, AfterViewInit {

  potentialCategoriesDisplayedColumns: string[] = ["name", "authorLogin", 'actions' ];
  potentialCategoriesDataSource: MatTableDataSource<PotentialCategory> = new MatTableDataSource<PotentialCategory>([] as PotentialCategory[])
  @ViewChild('paginatorPotentialCategories') paginatorPotentialCategories!: MatPaginator;
  @ViewChild('sortPotentialCategories') sortPotentialCategories!: MatSort;

  constructor(private potentialCategoryService: PotentialCategoryService,
              private categoryService: CategoryService,
              private snackbarService: SnackbarService) {
    this.getPotentialCategories()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.potentialCategoriesDataSource.paginator = this.paginatorPotentialCategories;
    this.potentialCategoriesDataSource.sort = this.sortPotentialCategories;
  }

  getPotentialCategories() {
    this.potentialCategoryService.getPotentialCategories().subscribe({
      next: value => {
        this.potentialCategoriesDataSource.data = value
      },
      error: err => {

      },
      complete: () => {

      }
    })
  }

  declinePotentialCategory(potentialCategoryId: number) {
    this.potentialCategoryService.deletePotentialCategoryById(potentialCategoryId).subscribe({
      next: value => {
        this.snackbarService.openSuccessSnackBar(value.message)
        this.getPotentialCategories()
      },
      error: err => {
        this.snackbarService.openErrorSnackBar(err.error)
      },
      complete: () => {

      }
    })
  }

  acceptPotentialCategory(potentialCategoryId: number) {
    this.potentialCategoryService.acceptPotentialCategoryById(potentialCategoryId).subscribe({
      next: value => {
        this.snackbarService.openSuccessSnackBar(value.message)
        this.getPotentialCategories()
      },
      error: err => {
        this.snackbarService.openErrorSnackBar(err.error)
      },
      complete: () => {

      }
    })
  }

  applyFilterPotentialCategories(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.potentialCategoriesDataSource.filter = filterValue.trim().toLowerCase();

    if (this.potentialCategoriesDataSource.paginator) {
      this.potentialCategoriesDataSource.paginator.firstPage();
    }
  }

}
