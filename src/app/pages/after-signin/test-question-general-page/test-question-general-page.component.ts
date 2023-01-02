import {Component, OnInit} from '@angular/core';
import {TestQuestion} from "../../../models/test-question";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Image} from "../../../models/image";
import {TestQuestionService} from "../../../services/test-question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {LoadingState} from "../../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-test-question-general-page',
  templateUrl: './test-question-general-page.component.html',
  styleUrls: ['./test-question-general-page.component.scss']
})
export class TestQuestionGeneralPageComponent implements OnInit {

  dataLoadingState = new LoadingState()

  originalTestQuestion = {} as TestQuestion
  editedTestQuestion = {} as TestQuestion
  selectedImage!: Image

  testQuestionForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required])
  })

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
    this.getParamsFromRoute()
    this.getTestQuestion()
  }

  getTestQuestion() {
    if(!!this.courseId && !!this.levelId && !!this.testQuestionId){
      this.dataLoadingState.setLoading()
      this.testQuestionService.getTestQuestionById(this.courseId, this.levelId, this.testQuestionId)
        .pipe(
          finalize(() => {
            this.dataLoadingState.setNotLoading()
          })
        )
        .subscribe({
          next: (res: TestQuestion) => {
            const body = res

            this.originalTestQuestion = JSON.parse(JSON.stringify(body))
            this.editedTestQuestion = JSON.parse(JSON.stringify(body))
            this.setFormValues()
          },
          error: error => {
            this.snackBarService.openSnackBar(error.message)
            this.router.navigate([`/home/courses/${this.courseId}/levels/${this.levelId}/testquestions`])
          },
        })
    }
  }

  getParamsFromRoute() {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    this.testQuestionId = Number(this.route.snapshot.paramMap.get('testQuestionId'))
  }

  setFormValues() {
    this.testQuestionForm.controls['question'].setValue(this.editedTestQuestion.question)
    this.testQuestionForm.controls['answer'].setValue(this.editedTestQuestion.answer)
    this.selectedImage = {name: this.editedTestQuestion.imageName, url: this.editedTestQuestion.imageUrl}
  }

  updateEditedTestQuestion() {
    this.editedTestQuestion.question = this.testQuestionForm.controls['question'].value!
    this.editedTestQuestion.answer = this.testQuestionForm.controls['answer'].value!
    this.editedTestQuestion.imageName = this.selectedImage.name
    this.editedTestQuestion.imageUrl = this.selectedImage.url
  }

  openImagePicker() {
    const dialog = this.dialogService.openImagePicker()
    dialog.afterClosed().subscribe({
      next: value => {
        if(value){
          this.selectedImage = value

        }
      },
      error: err => {

      }
    })
  }

  saveChanges() {
    this.updateEditedTestQuestion()
    const dialogRef = this.dialogService.openDataDiffDialog(this.originalTestQuestion, this.editedTestQuestion)

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.testQuestionService.editTestQuestionById(this.courseId, this.levelId, this.testQuestionId, this.editedTestQuestion).subscribe({
          next: (res) => {
            this.snackBarService.openSuccessSnackBar(res.message)
          },
          error: (err) => {

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

    });
  }

  deleteTestQuestion() {
    this.testQuestionService.deleteTestQuestionById(this.courseId, this.levelId, this.testQuestionId).subscribe({
      next: (res) => {
        this.snackBarService.openSuccessSnackBar(res.message)
      },
      error: (err) => {

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
