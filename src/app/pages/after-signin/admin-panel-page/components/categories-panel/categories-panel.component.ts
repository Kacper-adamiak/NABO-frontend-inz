import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PotentialCategoryService} from "../../../../../services/potential-category.service";
import {CategoryService} from "../../../../../services/category.service";
import {SnackbarService} from "../../../../../services/snackbar.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Category} from "../../../../../models/category";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "./edit-category-dialog/edit-category-dialog.component";
import {LoadingState} from "../../../../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss']
})
export class CategoriesPanelComponent implements OnInit, AfterViewInit {

  dataLoadingState = new LoadingState()

  categoriesDisplayedColumns: string[] = ["name", 'actions' ];
  categoriesDataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>([] as Category[])
  @ViewChild('paginatorCategories') paginatorCategories!: MatPaginator;
  @ViewChild('sortCategories') sortCategories!: MatSort;

  constructor(private potentialCategoryService: PotentialCategoryService,
              private categoryService: CategoryService,
              private snackbarService: SnackbarService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories()
  }

  ngAfterViewInit(): void {
    this.categoriesDataSource.paginator = this.paginatorCategories
    this.categoriesDataSource.sort = this.sortCategories
  }

  applyFilterCategories(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categoriesDataSource.filter = filterValue.trim().toLowerCase();

    if (this.categoriesDataSource.paginator) {
      this.categoriesDataSource.paginator.firstPage();
    }
  }

  getCategories() {
    this.dataLoadingState.setLoading()
    this.categoryService.getCategories()
      .pipe(finalize(() => {
        this.dataLoadingState.setNotLoading()
      }))
      .subscribe({
      next: value => {
        this.categoriesDataSource.data = value
      },
      error: err => {
        this.snackbarService.openErrorSnackBar(err.message)
      },
      complete: () => {

      }
    })
  }

  deleteCategory(categoryId: number) {

  }

  editCategory(category: Category) {
    const dialog = this.dialog.open(EditCategoryDialogComponent, {
      width: '80%',
      height: '80%',
      data: { category: category }
    })

    dialog.afterClosed().subscribe({
      next: value => {
        if(value) {
          this.getCategories()
        }
      },
      error: err => {

      }
    })
  }

}
