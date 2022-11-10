import {Component, Inject, OnInit} from '@angular/core';
import {Flashcard} from "../../../../models/flashcard";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlashcardService} from "../../../../services/flashcard/flashcard.service";
import {SnackbarService} from "../../../../services/snack-bar/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Exercise} from "../../../../models/exercise";
import {ExerciseService} from "../../../../services/exercise/exercise.service";

@Component({
  selector: 'app-new-exercise-dialog',
  templateUrl: './new-exercise-dialog.component.html',
  styleUrls: ['./new-exercise-dialog.component.scss']
})
export class NewExerciseDialogComponent implements OnInit {

  newExercise = {} as Exercise
  question = new FormControl('', [Validators.required])
  expression = new FormControl('', [Validators.required])
  bad_answer1 = new FormControl('', [Validators.required])
  bad_answer2 = new FormControl('', [Validators.required])
  bad_answer3 = new FormControl('', [Validators.required])
  imageName = new FormControl('', [Validators.required])

  constructor(
    public dialogRef: MatDialogRef<NewExerciseDialogComponent>,
    private exerciseService: ExerciseService,
    private snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: number, levelId: number, exerciseId: number },
  ) {
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    this.newExercise.question = this.question.value
    this.newExercise.expression = this.expression.value
    this.newExercise.bad_answer1 = this.bad_answer1.value
    this.newExercise.bad_answer2 = this.bad_answer2.value
    this.newExercise.bad_answer3 = this.bad_answer3.value
    this.newExercise.imageName = this.imageName.value


    this.exerciseService.addExercise(this.data.courseId, this.data.levelId ,this.newExercise).subscribe({
      next: res => {
        this.snackBarService.openSuccessSnackBar(res.body!.message!)
      },
      error: err => {
        console.log("exerciseService", err)
        this.snackBarService.openErrorSnackBar(err.error)
      },
      complete: () => {
        this.dialogRef.close()
      }
    })

  }

}
