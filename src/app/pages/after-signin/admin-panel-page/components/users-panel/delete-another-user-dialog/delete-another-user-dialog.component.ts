import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../../../../services/auth.service";
import {UserService} from "../../../../../../services/user.service";
import {SnackbarService} from "../../../../../../services/snackbar.service";

@Component({
  selector: 'app-delete-another-user-dialog',
  templateUrl: './delete-another-user-dialog.component.html',
  styleUrls: ['./delete-another-user-dialog.component.scss']
})
export class DeleteAnotherUserDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteAnotherUserDialogComponent>,
    private authService: AuthService,
    private userService: UserService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: {login: string, id: number},
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close(false)
  }

  onAccept() {
    this.userService.deleteUserById(this.data.id!).subscribe({
      next: value => {
        this.snackbarService.openSuccessSnackBar(value.message)
        this.dialogRef.close(true)
      },
      error: err => {
        this.snackbarService.openErrorSnackBar(err.message)
      }
    });
  }

}
