import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../../services/snackbar.service";
import {Exercise} from "../../../../models/exercise";
import {ExerciseService} from "../../../../services/exercise.service";
import {Image} from "../../../../models/image";
import {DialogService} from "../../../../services/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-exercise-dialog',
  templateUrl: './new-exercise-dialog.component.html',
  styleUrls: ['./new-exercise-dialog.component.scss']
})
export class NewExerciseDialogComponent implements OnInit {

  newExercise = {} as Exercise

  selectedImage!: Image

  exerciseForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
    bad_answer1: new FormControl('', [Validators.required]),
    bad_answer2: new FormControl('', [Validators.required]),
    bad_answer3: new FormControl('', [Validators.required])
  })

  constructor(
    public dialogRef: MatDialogRef<NewExerciseDialogComponent>,
    private exerciseService: ExerciseService,
    private snackBarService: SnackbarService,
    private dialogService: DialogService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: number, levelId: number, exerciseId: number },
  ) {
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onAccept() {
    this.setNewExerciseData()
    this.addNewExercise()
  }

  addNewExercise() {
    this.exerciseService.addExercise(this.data.courseId, this.data.levelId, this.newExercise).subscribe({
      next: res => {
        this.snackBarService.openSuccessSnackBar(res.message)
        this.dialogRef.close(true)
      },
      error: err => {
        console.log("exerciseService", err)
        this.snackBarService.openErrorSnackBar(err.error)
      }
    })
  }

  setNewExerciseData() {
    this.newExercise.question = this.exerciseForm.controls['question'].value!
    this.newExercise.answer = this.exerciseForm.controls['answer'].value!
    this.newExercise.bad_answer1 = this.exerciseForm.controls['bad_answer1'].value!
    this.newExercise.bad_answer2 = this.exerciseForm.controls['bad_answer2'].value!
    this.newExercise.bad_answer3 = this.exerciseForm.controls['bad_answer3'].value!
    this.newExercise.imageName = this.selectedImage.name
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
