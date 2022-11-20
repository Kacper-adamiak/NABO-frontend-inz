import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../../services/dialog/dialog.service";

@Component({
  selector: 'app-account-edit-page',
  templateUrl: './account-edit-page.component.html',
  styleUrls: ['./account-edit-page.component.scss']
})
export class AccountEditPageComponent implements OnInit {

  data = {
    login: "",
    email: "",
    firstName: "",
    lastName: ""
  }

  login = new UntypedFormControl('', Validators.required)
  email = new UntypedFormControl('', Validators.required)
  firstName = new UntypedFormControl('', Validators.required)
  lastName = new UntypedFormControl('', Validators.required)

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private dialogService: DialogService) { }

  ngOnInit(): void {

    const spinner = this.dialogService.openSpinner()
    const userData = this.userService.getUserData().subscribe({
      next: res => {
        this.data = res
        this.login.setValue(res.login)
        this.email.setValue(res.email)
        this.firstName.setValue(res.firstName)
        this.lastName.setValue(res.lastName)
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

}
