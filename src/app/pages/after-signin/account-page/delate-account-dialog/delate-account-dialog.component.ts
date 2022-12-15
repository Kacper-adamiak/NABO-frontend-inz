import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../../services/snackbar.service";
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-delate-account-dialog',
  templateUrl: './delate-account-dialog.component.html',
  styleUrls: ['./delate-account-dialog.component.scss']
})
export class DelateAccountDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DelateAccountDialogComponent>,
    private authService: AuthService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close(false)
  }

  onAccept() {
    this.userService.deleteUser().subscribe({
      next: value => {
        this.authService.logout();
        this.snackbarService.openSuccessSnackBar(value.message)
      },
      error: err => {
        this.snackbarService.openErrorSnackBar(err.message)
      }
    });
  }
}
