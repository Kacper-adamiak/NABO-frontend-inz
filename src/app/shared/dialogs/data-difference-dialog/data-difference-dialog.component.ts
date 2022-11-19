import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-data-difference-dialog',
  templateUrl: './data-difference-dialog.component.html',
  styleUrls: ['./data-difference-dialog.component.scss']
})
export class DataDifferenceDialogComponent implements OnInit {

  objectKeys: string[] = []

  constructor(
    public dialogRef: MatDialogRef<DataDifferenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {originalData: any, editedData: any},
  ) {
      this.objectKeys = Object.keys(this.data.originalData)
  }

  onDecline(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onAccept() {
    this.dialogRef.close(true);
  }

  firstLetterToUpperCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

}
