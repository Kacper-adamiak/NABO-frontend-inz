import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog/dialog.service";
import {SnackbarService} from "../../services/snack-bar/snackbar.service";

@Component({
  selector: 'app-starting-page',
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.scss'],
})
export class StartingPageComponent implements OnInit {

  constructor(private dialogService: DialogService,
              private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialog = this.dialogService.openUploadImage()
  }

  openSnackbar() {
    this.snackbarService.openSuccessSnackBar("działa")
  }

}
