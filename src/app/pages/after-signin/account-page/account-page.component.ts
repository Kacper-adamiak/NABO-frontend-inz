import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {DialogService} from "../../../services/dialog/dialog.service";
import {MatDialog} from "@angular/material/dialog";
import {DelateAccountDialogComponent} from "./delate-account-dialog/delate-account-dialog.component";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  data = {
    login: "",
    email: "",
    firstName: "",
    lastName: ""
  }
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {

  }

  ngOnInit(): void {

    const spinner = this.dialogService.openSpinner()
    const userData = this.userService.getUserData().subscribe({
      next: res => {
        this.data = res
      },
      error: err => {
        spinner.close()
      },
      complete: () => {
        spinner.close()
        userData.unsubscribe()
      }
    })
  }

  openDeleteDialog() {
    const dialogRef =this.dialog.open(DelateAccountDialogComponent, {
      width: 'fit-content',
      height: 'fit-content'
    })
  }

}
