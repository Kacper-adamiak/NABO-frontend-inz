import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";
import {LoadingState} from "../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private snackbarService: SnackbarService) {
  }

  hide = true
  passwordMismatch = false
  dataLoadingState = new LoadingState()

  token: string = ""
  //Minimalnie 8 znaków, przynajmniej 1 wielka litera, 1 mała litera, 1 cyfra, 1 specjalny znak
  passwordRegex: RegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)

  form: FormGroup = new FormGroup({
    password: new FormControl("", [Validators.pattern(this.passwordRegex)]),
    passwordConfirm: new FormControl("", [Validators.pattern(this.passwordRegex)])
  })

  comparePasswords() {
    if (this.form.controls["password"].value != this.form.controls["passwordConfirm"].value) this.passwordMismatch = true
    this.passwordMismatch = false
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.getRouteParams()
    this.resetPassword()
  }

  resetPassword() {
    this.dataLoadingState.setLoading()
    this.userService.resetPassword(this.token, this.form.controls['password'].value)
      .pipe(
        finalize(() => {
          this.dataLoadingState.setNotLoading()
        })
      )
      .subscribe({
        next: value => {
          this.snackbarService.openSuccessSnackBar(value.message);
        },
        error: err => {
          this.snackbarService.openErrorSnackBar(err.error);
        }
      })
  }

  getRouteParams() {
    this.route.queryParams
      .subscribe(params => {
          this.token = params['token'];
        }
      );
  }
}
