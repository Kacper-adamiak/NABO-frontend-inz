import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../../services/dialog.service";
import {SnackbarService} from "../../../../services/snackbar.service";
import {LoadingState} from "../../../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-account-edit-page',
  templateUrl: './account-edit-page.component.html',
  styleUrls: ['./account-edit-page.component.scss']
})
export class AccountEditPageComponent implements OnInit {

  dataLoadingState = new LoadingState()
  hide = true;
  data = {
    firstName: "",
    lastName: "",
    password: "",
    isActive: true
  }

  editAccountForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private dialogService: DialogService,
              private snackbarService: SnackbarService
              ) { }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    this.dataLoadingState.setLoading()
    this.userService.getUserData()
      .pipe(
        finalize(()=>{
          this.dataLoadingState.setNotLoading()
        })
      )
      .subscribe({
        next: res => {
          this.data = res
          this.setEditAccountForm()
        },
        error: err => {
          this.snackbarService.openErrorSnackBar(err.message)
        }
      })
  }

  setEditAccountForm() {
    this.editAccountForm.controls['firstName'].setValue(this.data.firstName)
    this.editAccountForm.controls['lastName'].setValue(this.data.lastName)
  }

  saveChanges() {
    this.getValues()
    this.userService.editUser(this.data).subscribe({
      next: value => {
        this.snackbarService.openSuccessSnackBar(value.message)
      },
      error: err => {
        if(err.password) this.snackbarService.openErrorSnackBar(err.password)
        if(err.firstName) this.snackbarService.openErrorSnackBar(err.firstName)
        if(err.lastName) this.snackbarService.openErrorSnackBar(err.lastName)
        if(err.error) this.snackbarService.openErrorSnackBar(err.error)
      }
    })
  }

  getValues() {
    this.data.firstName = this.editAccountForm.controls['firstName'].value!
    this.data.lastName = this.editAccountForm.controls['lastName'].value!
    this.data.password = this.editAccountForm.controls['password'].value!
  }

}
