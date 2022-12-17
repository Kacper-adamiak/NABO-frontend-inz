import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

  selectedImage!: Image

  testQuestionForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required])
  })

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
    this.getNewTestQuestionFromForm()
    this.addNewTestQuestion()
  }

  addNewTestQuestion(){
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

  getNewTestQuestionFromForm() {
    this.newTestQuestion.question = this.testQuestionForm.controls['question'].value!
    this.newTestQuestion.answer = this.testQuestionForm.controls['answer'].value!
    this.newTestQuestion.imageName = this.selectedImage.name
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
