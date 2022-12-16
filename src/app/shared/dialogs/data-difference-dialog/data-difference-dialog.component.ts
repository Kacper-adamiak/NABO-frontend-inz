import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DictionaryService} from "../../../services/dictionary.service";

@Component({
  selector: 'app-data-difference-dialog',
  templateUrl: './data-difference-dialog.component.html',
  styleUrls: ['./data-difference-dialog.component.scss']
})
export class DataDifferenceDialogComponent implements OnInit {

  objectKeys: string[] = []
  acceptIsDisabled = true

  constructor(
    public dialogRef: MatDialogRef<DataDifferenceDialogComponent>,
    public dictionaryService: DictionaryService,
    @Inject(MAT_DIALOG_DATA) public data: {originalData: any, editedData: any},
  ) {
      this.objectKeys = Object.keys(this.data.originalData).filter((value) => {
        const hiddenKeys = ['id', 'created', 'modified', 'authorId', 'authorLogin', 'exerciseNumber', 'flashcardNumber', 'testQuestionNumber']
        return !hiddenKeys.includes(value)
      })

      for (const key of this.objectKeys) {
        if(this.data.editedData[key] != this.data.originalData[key]){
          this.acceptIsDisabled = false
          break
        }
      }
  }

  onDecline(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onAccept() {
    this.dialogRef.close(true);
  }
}
