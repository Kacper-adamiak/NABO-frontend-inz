import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {DialogService} from "../../../services/dialog.service";
import {SnackbarService} from "../../../services/snackbar.service";
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

  login = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])

  onSubmit() {
    this.authService.login({login: this.login.value!, password: this.password.value!}).subscribe({
      next: res => {
      },
      error: err => {
        if(err.status == 401){
          this.snackbarService.openErrorSnackBar("Konto o podanym loginie i haśle nie istnieje")
        }
        else {
          this.snackbarService.openErrorSnackBar(err.error.message)
        }
      },
      complete: () => {
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
