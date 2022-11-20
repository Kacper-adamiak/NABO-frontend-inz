import {Component, OnInit} from '@angular/core';
import {TestQuestion} from "../../../models/test-question";
import {UntypedFormControl, Validators} from "@angular/forms";
import {Image} from "../../../models/image";
import {TestQuestionService} from "../../../services/test-question/test-question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog/dialog.service";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";

@Component({
  selector: 'app-test-question-general-page',
  templateUrl: './test-question-general-page.component.html',
  styleUrls: ['./test-question-general-page.component.scss']
})
export class TestQuestionGeneralPageComponent implements OnInit {

  originalTestQuestion = {} as TestQuestion
  editedTestQuestion = {} as TestQuestion
  question = new UntypedFormControl('', [Validators.required])
  answer = new UntypedFormControl('', [Validators.required])
  selectedImage!: Image

  courseId!: number
  levelId!: number
  testQuestionId!: number

  constructor(
    private testQuestionService: TestQuestionService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private snackBarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    this.testQuestionId = Number(this.route.snapshot.paramMap.get('testQuestionId'))
    if(!!this.courseId && !!this.levelId && !!this.testQuestionId){
      const spinner = this.dialogService.openSpinner()
      this.testQuestionService.getTestQuestionById(this.courseId, this.levelId, this.testQuestionId).subscribe({
        next: (res: TestQuestion) => {
          const body = res

          this.originalTestQuestion = JSON.parse(JSON.stringify(body))
          this.editedTestQuestion = JSON.parse(JSON.stringify(body))

          this.question.setValue(this.editedTestQuestion.question)
          this.answer.setValue(this.editedTestQuestion.answer)
          this.selectedImage = {name: this.editedTestQuestion.imageName, url: this.editedTestQuestion.imageUrl}
        },
        error: error => {
          spinner.close()
          this.snackBarService.openSnackBar(error.message)
          this.router.navigate([`/home/courses/${this.courseId}/levels/${this.levelId}/testquestions`])
        },
        complete: () => {
          spinner.close()
        }
      })
    }
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

  saveChanges() {
    this.editedTestQuestion.question = this.question.value
    this.editedTestQuestion.answer = this.answer.value
    this.editedTestQuestion.imageName = this.selectedImage.name
    this.editedTestQuestion.imageUrl = this.selectedImage.url

    const dialogRef = this.dialogService.openDataDiffDialog(this.originalTestQuestion, this.editedTestQuestion)

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.testQuestionService.editTestQuestionById(this.courseId, this.levelId, this.testQuestionId, this.editedTestQuestion).subscribe({
          next: (res) => {
            this.snackBarService.openSuccessSnackBar(res.message)
          },
          error: (err) => {
            console.log("error: ", err)
            if(err.error.name) {
              this.snackBarService.openErrorSnackBar(err.name)
            }
            if(err.error.description) {
              this.snackBarService.openErrorSnackBar(err.description)
            }
            if(err.error.statusName) {
              this.snackBarService.openErrorSnackBar(err.statusName)
            }
          }
        })
        this.originalTestQuestion = JSON.parse(JSON.stringify(this.editedTestQuestion))
      }
      console.log('The dialog was closed');
    });
  }

  deleteTestQuestion() {
    this.testQuestionService.deleteTestQuestionById(this.courseId, this.levelId, this.testQuestionId).subscribe({
      next: (res) => {
        this.snackBarService.openSuccessSnackBar(res.message)
      },
      error: (err) => {
        console.log("error: ", err)
        if(err.error.name) {
          this.snackBarService.openErrorSnackBar(err.name)
        }
        if(err.error.description) {
          this.snackBarService.openErrorSnackBar(err.description)
        }
        if(err.error.statusName) {
          this.snackBarService.openErrorSnackBar(err.statusName)
        }
      }
    })
  }
}
