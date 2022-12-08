import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../../services/dialog/dialog.service";
import {SnackbarService} from "../../../../services/snack-bar/snackbar.service";

@Component({
  selector: 'app-account-edit-page',
  templateUrl: './account-edit-page.component.html',
  styleUrls: ['./account-edit-page.component.scss']
})
export class AccountEditPageComponent implements OnInit {

  hide = true;
  data = {
    firstName: "",
    lastName: "",
    password: "",
    isActive: true
  }

  firstName = new UntypedFormControl('', Validators.required)
  lastName = new UntypedFormControl('', Validators.required)
  password = new UntypedFormControl('', Validators.required)

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private dialogService: DialogService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {

    const spinner = this.dialogService.openSpinner()
    const userData = this.userService.getUserData().subscribe({
      next: res => {
        this.data = res
        this.firstName.setValue(res.firstName)
        this.lastName.setValue(res.lastName)
      },
      error: err => {
        this.snackbarService.openErrorSnackBar(err.error)
        spinner.close()
      },
      complete: () => {
        spinner.close()
        userData.unsubscribe()
      }
    })
  }

  saveChanges() {
    this.getValues()
    this.userService.editUser(this.data).subscribe({
      next: value => {
        this.snackbarService.openSuccessSnackBar(value.message)
      },
      error: err => {
        this.snackbarService.openSuccessSnackBar(err.error)
      },
      complete: () => {

      }
    })
  }

  getValues() {
    this.data.firstName = this.firstName.value
    this.data.lastName = this.lastName.value
    this.data.password = this.password.value
  }

}
