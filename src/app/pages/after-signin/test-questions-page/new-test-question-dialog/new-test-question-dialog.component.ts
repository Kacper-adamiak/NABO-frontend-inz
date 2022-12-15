import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../../services/snackbar.service";
import {TestQuestionService} from "../../../../services/test-question.service";
import {TestQuestion} from "../../../../models/test-question";
import {Image} from "../../../../models/image";
import {DialogService} from "../../../../services/dialog.service";

@Component({
  selector: 'app-new-test-question-dialog',
  templateUrl: './new-test-question-dialog.component.html',
  styleUrls: ['./new-test-question-dialog.component.scss']
})
export class NewTestQuestionDialogComponent implements OnInit {

  newTestQuestion = {} as TestQuestion
  question = new UntypedFormControl('', [Validators.required])
  answer = new UntypedFormControl('', [Validators.required])
  selectedImage!: Image

  constructor(
    public dialogRef: MatDialogRef<NewTestQuestionDialogComponent>,
    private testQuestionService: TestQuestionService,
    private snackBarService: SnackbarService,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: number, levelId: number },
  ) {
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close(false)
  }

  onAccept() {
    this.newTestQuestion.question = this.question.value
    this.newTestQuestion.answer = this.answer.value
    this.newTestQuestion.imageName = this.selectedImage.name

    this.testQuestionService.addTestQuestion(this.data.courseId, this.data.levelId ,this.newTestQuestion).subscribe({
      next: res => {
        this.dialogRef.close(true)
        this.snackBarService.openSuccessSnackBar(res.message)

      },
      error: err => {
        this.dialogRef.close(false)
        this.snackBarService.openErrorSnackBar(err)
      }
    })
  }

  openImagePicker() {
    const dialog = this.dialogService.openImagePicker()
    dialog.afterClosed().subscribe({
      next: value => {
        if(value){
          this.selectedImage = value
          console.log("after close picker: ",value)
        }
      },
      error: err => {
        console.log('something went wrong')
      }
    })
  }

}
