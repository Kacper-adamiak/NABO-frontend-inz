import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../../services/snack-bar/snackbar.service";
import {Exercise} from "../../../../models/exercise";
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {Image} from "../../../../models/image";
import {DialogService} from "../../../../services/dialog/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-exercise-dialog',
  templateUrl: './new-exercise-dialog.component.html',
  styleUrls: ['./new-exercise-dialog.component.scss']
})
export class NewExerciseDialogComponent implements OnInit {

  newExercise = {} as Exercise
  question = new UntypedFormControl('', [Validators.required])
  expression = new UntypedFormControl('', [Validators.required])
  bad_answer1 = new UntypedFormControl('', [Validators.required])
  bad_answer2 = new UntypedFormControl('', [Validators.required])
  bad_answer3 = new UntypedFormControl('', [Validators.required])
  selectedImage!: Image

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
    this.newExercise.question = this.question.value
    this.newExercise.expression = this.expression.value
    this.newExercise.bad_answer1 = this.bad_answer1.value
    this.newExercise.bad_answer2 = this.bad_answer2.value
    this.newExercise.bad_answer3 = this.bad_answer3.value
    this.newExercise.imageName = this.selectedImage.name


    this.exerciseService.addExercise(this.data.courseId, this.data.levelId ,this.newExercise).subscribe({
      next: res => {
        this.snackBarService.openSuccessSnackBar(res.message)
        this.dialogRef.close(true)
      },
      error: err => {
        console.log("exerciseService", err)
        this.snackBarService.openErrorSnackBar(err.error)
        this.dialogRef.close(false)
      },
      complete: () => {

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
