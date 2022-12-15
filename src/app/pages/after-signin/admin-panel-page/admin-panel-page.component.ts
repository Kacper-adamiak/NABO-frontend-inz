import {Component, OnInit} from '@angular/core';
import {PotentialCategoryService} from "../../../services/potential-category.service";
import {CategoryService} from "../../../services/category.service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.scss']
})
export class AdminPanelPageComponent implements OnInit {



  constructor(
    private potentialCategoryService: PotentialCategoryService,
    private categoryService: CategoryService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

}
