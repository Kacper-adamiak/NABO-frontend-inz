import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {

  hide = true
  spinner = false
  passwordMismatch = false

  token: string = ""

  //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  passwordRegexp: RegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  password = new UntypedFormControl("",
    [
      Validators.pattern(this.passwordRegexp)
  ]);
  passwordConfirm = new UntypedFormControl("",
    [
      Validators.pattern(this.passwordRegexp)
    ]
  );

  form: FormGroup = this.fb.group({
    password: this.password,
    passwordConfirm: this.passwordConfirm
  })

  constructor(private userService: UserService, private route: ActivatedRoute, private snackbarService: SnackbarService, private fb: FormBuilder) {
  }

  get f() {
    return this.form.controls;
  }

  comparePasswords() {
    if(this.f["password"].value != this.f["passwordConfirm"].value) this.passwordMismatch = true
    this.passwordMismatch = false
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.route.queryParams
      .subscribe(params => {
          console.log(params['token']);
          this.token = params['token'];
        }
      );
    console.log("password value:  ", this.password.value, this.form.valid)
    this.spinner = true;
    this.userService.resetPassword(this.token, this.password.value).subscribe({
      next: value => {
        this.spinner = false;
        this.snackbarService.openSuccessSnackBar(value.message);
        console.log("good: ", value)
      },
      error: err => {
        this.spinner = false;
        this.snackbarService.openErrorSnackBar(err.error);
        console.log("bad: ", err)
      }
    })
  }
}
