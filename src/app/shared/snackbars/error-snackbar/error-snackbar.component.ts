import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss']
})
export class ErrorSnackbarComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<ErrorSnackbarComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
