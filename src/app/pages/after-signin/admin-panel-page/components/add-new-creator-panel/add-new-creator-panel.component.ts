import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../../../services/auth/auth.service";
import {SnackbarService} from "../../../../../services/snack-bar/snackbar.service";

@Component({
  selector: 'app-add-new-creator-panel',
  templateUrl: './add-new-creator-panel.component.html',
  styleUrls: ['./add-new-creator-panel.component.scss']
})
export class AddNewCreatorPanelComponent implements OnInit {

  @Output() afterAdd = new EventEmitter<any>()


  //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  passwordRegexp: RegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  login = new UntypedFormControl('', [Validators.required])
  password = new UntypedFormControl('', [Validators.required, Validators.pattern(this.passwordRegexp)])
  email = new UntypedFormControl('', [Validators.required])

  constructor(
    private authService:AuthService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  addNewCreator() {
      this.authService.signup(this.login.value, this.email.value, this.password.value).subscribe({
        next: value => {
          this.snackbarService.openSuccessSnackBar(value.message)
          this.afterAdd.emit(true)
        },
        error: err => {
          this.snackbarService.openErrorSnackBar(err.error)
        }
      })
  }

}
