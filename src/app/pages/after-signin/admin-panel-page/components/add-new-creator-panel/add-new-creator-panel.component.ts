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

  login = new UntypedFormControl('', [Validators.required])
  password = new UntypedFormControl('', [Validators.required])
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
