import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PotentialCategoryService} from "../../../../../services/potential-category/potential-category.service";
import {CategoryService} from "../../../../../services/category/category.service";
import {SnackbarService} from "../../../../../services/snack-bar/snackbar.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Category} from "../../../../../models/category";

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss']
})
export class CategoriesPanelComponent implements OnInit, AfterViewInit {

  categoriesDisplayedColumns: string[] = ["name", 'actions' ];
  categoriesDataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>([] as Category[])
  @ViewChild('paginatorCategories') paginatorCategories!: MatPaginator;
  @ViewChild('sortCategories') sortCategories!: MatSort;

  constructor(private potentialCategoryService: PotentialCategoryService,
              private categoryService: CategoryService,
              private snackbarService: SnackbarService) { }

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

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: value => {
        this.categoriesDataSource.data = value
      },
      error: err => {
      },
      complete: () => {

      }
    })
  }

  deleteCategory() {

  }

  editCategory() {

  }

}
