import {Component, OnInit} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {AuthService} from 'src/app/services/auth/auth.service';
import {DialogService} from "../../../services/dialog/dialog.service";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";
import {Router} from "@angular/router";

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
              private snackbarService: SnackbarService,
              private router: Router) { }

  ngOnInit(): void {
    this.chceckIfUserLoggedIn()
  }

  email = new UntypedFormControl('')
  password = new UntypedFormControl('')

  onSubmit() {
    let spinner = this.dialogService.openSpinner()
    this.authService.signin(this.email.value, this.password.value).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => {
        spinner.close()
        console.log(err)
        if(err.status == 401){
          this.snackbarService.openErrorSnackBar("Konto o podanym loginie i haśle nie istnieje")
        }
        else {
          this.snackbarService.openErrorSnackBar(err.error.message)
        }

      },
      complete: () => {
        spinner.close()
        this.snackbarService.openSuccessSnackBar("Pomyślnie zalogowano!")
      }
    });
  }

  chceckIfUserLoggedIn() {
    let data = this.authService.getUserData()
    if(data != null && data != ""){
      this.router.navigate(['home'])
    }
  }

}
