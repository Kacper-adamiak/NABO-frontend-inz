import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email])

  constructor(private authService: AuthService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.authService.forgotPassword(this.email.value!).subscribe({
      next: value => {
        console.log("-> value", value);
        this.snackbarService.openSuccessSnackBar(value.message)
      },
      error: err => {
        console.log("-> err", err);
        this.snackbarService.openSuccessSnackBar(err.message)
      }
    })
  }

}
