import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {DialogService} from "../../../services/dialog/dialog.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit, OnDestroy {

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

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    console.log("on Destroy AccountPageComponent")
  }

}
