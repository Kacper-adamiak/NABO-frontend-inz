import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {ExerciseService} from "../../../services/exercise.service";
import {Exercise} from "../../../models/exercise";
import {Image} from "../../../models/image";
import {LoadingState} from "../../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-exercise-general-page',
  templateUrl: './exercise-general-page.component.html',
  styleUrls: ['./exercise-general-page.component.scss']
})
export class ExerciseGeneralPageComponent implements OnInit {

  dataLoadingState = new LoadingState()

  originalData = {} as Exercise
  editedData = {} as Exercise

  exerciseForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
    bad_answer1: new FormControl('', [Validators.required]),
    bad_answer2: new FormControl('', [Validators.required]),
    bad_answer3: new FormControl('', [Validators.required])
  })
  selectedImage!: Image

  courseId!: number
  levelId!: number
  exerciseId!: number

  constructor(
    public dialog: MatDialog,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private dialogService: DialogService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getParamsFromRoute()
    this.getExercise()
  }

  getParamsFromRoute() {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    this.exerciseId = Number(this.route.snapshot.paramMap.get('exerciseId'))
  }

  getExercise() {
    if (!!this.courseId && !!this.levelId) {
      this.dataLoadingState.setLoading()
      this.exerciseService.getExerciseById(this.courseId, this.levelId, this.exerciseId)
        .pipe(
          finalize(() => {
            this.dataLoadingState.setNotLoading()
          })
        )
        .subscribe({
          next: (res: Exercise) => {
            this.editedData = JSON.parse(JSON.stringify(res))
            this.originalData = JSON.parse(JSON.stringify(res))
            this.setEditedExercise()
          },
          error: error => {
            this.snackBarService.openSnackBar(error.message)
            this.router.navigate([`..`], {relativeTo: this.route})
          }
        })
    }
  }

  setEditedExercise() {
    this.exerciseForm.controls['question'].setValue(this.editedData.question)
    this.exerciseForm.controls['answer'].setValue(this.editedData.answer)
    this.exerciseForm.controls['bad_answer1'].setValue(this.editedData.bad_answer1)
    this.exerciseForm.controls['bad_answer2'].setValue(this.editedData.bad_answer2)
    this.exerciseForm.controls['bad_answer3'].setValue(this.editedData.bad_answer3)
    this.selectedImage = {name: this.editedData.imageName, url: this.editedData.imageUrl}
  }

  setEditedExerciseFromForm() {
    this.editedData.question = this.exerciseForm.controls['question'].value!
    this.editedData.answer = this.exerciseForm.controls['answer'].value!
    this.editedData.bad_answer1 = this.exerciseForm.controls['bad_answer1'].value!
    this.editedData.bad_answer2 = this.exerciseForm.controls['bad_answer2'].value!
    this.editedData.bad_answer3 = this.exerciseForm.controls['bad_answer3'].value!
    this.editedData.imageName = this.selectedImage.name
    this.editedData.imageUrl = this.selectedImage.url
  }

  deleteExercise() {
    this.exerciseService.deleteExerciseById(this.courseId, this.levelId, this.exerciseId).subscribe({
      next: res => {
        this.snackBarService.openSuccessSnackBar(res.message)
        this.router.navigate([`..`], {relativeTo: this.route})
      },
      error: err => {
        this.snackBarService.openErrorSnackBar(err.error)
      }
    })
  }

  openDialog(): void {

    this.setEditedExerciseFromForm()

    const dialogRef = this.dialogService.openDataDiffDialog(this.originalData, this.editedData)

    dialogRef.afterClosed().subscribe(value => {
      if (value) {

        this.exerciseService.editExerciseById(this.courseId, this.levelId, this.editedData).subscribe({
          next: res => {
            this.originalData = JSON.parse(JSON.stringify(this.editedData))
            this.snackBarService.openSuccessSnackBar(res.message)
          },
          error: err => {
            this.snackBarService.openSuccessSnackBar(err.error)
          },
          complete: () => {

          }
        })
      } else {

      }

    });
  }

  openImagePicker() {
    const dialog = this.dialogService.openImagePicker()
    dialog.afterClosed().subscribe({
      next: value => {
        if (value) {
          this.selectedImage = value

        }
      },
      error: err => {

      }
    })
  }

}
