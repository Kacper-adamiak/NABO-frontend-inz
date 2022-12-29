import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../../services/user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogService} from "../../../../../../services/dialog.service";
import {SnackbarService} from "../../../../../../services/snackbar.service";
import {User} from "../../../../../../models/user";

@Component({
  selector: 'app-edit-another-user-dialog',
  templateUrl: './edit-another-user-dialog.component.html',
  styleUrls: ['./edit-another-user-dialog.component.scss']
})
export class EditAnotherUserDialogComponent implements OnInit {

  hide = false
  responseData: User = {} as User
  userData = {
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

  constructor(public dialogRef: MatDialogRef<EditAnotherUserDialogComponent>,
              private userService: UserService,
              public dialog: MatDialog,
              private dialogService: DialogService,
              private snackbarService: SnackbarService,
              @Inject(MAT_DIALOG_DATA) public data: {id: number},) {
    this.responseData.login = " "
  }

  ngOnInit(): void {
    this.getUserData()
  }

  onNoClick() {
    this.dialogRef.close(false)
  }

  onAccept() {
    this.saveChanges()
  }

  getUserData() {
    this.userService.getUserDataById(this.data.id)
      .subscribe({
        next: res => {
          this.responseData = res
          this.setEditAccountForm()
        },
        error: err => {
          this.snackbarService.openErrorSnackBar(err.message)
        }
      })
  }

  setEditAccountForm() {
    this.editAccountForm.controls['firstName'].setValue(this.responseData.firstName)
    this.editAccountForm.controls['lastName'].setValue(this.responseData.lastName)
  }

  saveChanges() {
    this.getValues()
    this.userService.editUserById(this.data.id, this.userData).subscribe({
      next: value => {
        this.snackbarService.openSuccessSnackBar(value.message)
        this.dialogRef.close(true)
      },
      error: err => {
        if(err.password) this.snackbarService.openErrorSnackBar(err.error.password)
        if(err.firstName) this.snackbarService.openErrorSnackBar(err.error.firstName)
        if(err.lastName) this.snackbarService.openErrorSnackBar(err.error.lastName)
        if(err.error) this.snackbarService.openErrorSnackBar(err.error.error)
      }
    })
  }

  getValues() {
    this.userData.firstName = this.editAccountForm.controls['firstName'].value!
    this.userData.lastName = this.editAccountForm.controls['lastName'].value!
    this.userData.password = this.editAccountForm.controls['password'].value!
  }



}
