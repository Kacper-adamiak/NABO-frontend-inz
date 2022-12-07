import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {SnackbarService} from "../../services/snack-bar/snackbar.service";

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {

  hide = true;
  spinner = false

  token: string = ""

  password = new UntypedFormControl("", [Validators.required]);
  passwordConfirm = new UntypedFormControl("", [Validators.required]);

  form: FormGroup = new FormGroup({})

  constructor(private userService: UserService, private route: ActivatedRoute, private snackbarService: SnackbarService,private fb: FormBuilder) {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    })
  }

  get f(){
    return this.form.controls;
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
