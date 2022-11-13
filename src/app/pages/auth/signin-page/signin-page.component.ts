import {Component, OnInit} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {AuthService} from 'src/app/services/auth/auth.service';
import {DialogService} from "../../../services/dialog/dialog.service";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {
  hide = true;
  constructor(
              private authService: AuthService,
              private dialogService: DialogService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  email = new UntypedFormControl('')
  password = new UntypedFormControl('')

  onSubmit() {
    let spinner = this.dialogService.openSpinner()
    this.authService.signin(this.email.value, this.password.value).subscribe({
      next: res => {
      },
      error: err => {
        spinner.close()
        this.snackbarService.openErrorSnackBar(err.message)
      },
      complete: () => {
        spinner.close()
        this.snackbarService.openSuccessSnackBar("Pomyślnie zalogowano!")
      }
    });
  }

}
