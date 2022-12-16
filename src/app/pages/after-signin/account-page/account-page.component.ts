import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DelateAccountDialogComponent} from "./delate-account-dialog/delate-account-dialog.component";
import {LoadingState} from "../../../utils/loading-state";
import {finalize} from "rxjs";


@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  dataLoadingState = new LoadingState()

  data = {
    login: "",
    email: "",
    firstName: "",
    lastName: ""
  }

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    this.getUserData()
  }

  getUserData() {
    this.dataLoadingState.setLoading()
    this.userService.getUserData()
      .pipe(finalize(() => {
        this.dataLoadingState.setNotLoading()
      }))
      .subscribe({
        next: res => {
          this.data = res
        }
      })
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DelateAccountDialogComponent, {
      width: 'fit-content',
      height: 'fit-content'
    })
  }

}
