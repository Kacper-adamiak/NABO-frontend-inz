import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog/dialog.service";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {Exercise} from "../../../models/exercise";

@Component({
  selector: 'app-exercise-general-page',
  templateUrl: './exercise-general-page.component.html',
  styleUrls: ['./exercise-general-page.component.scss']
})
export class ExerciseGeneralPageComponent implements OnInit {

  originalData = {} as Exercise
  editedData = {} as Exercise
  question = new UntypedFormControl('', [Validators.required])
  expression = new UntypedFormControl('', [Validators.required])
  bad_answer1 = new UntypedFormControl('', [Validators.required])
  bad_answer2 = new UntypedFormControl('', [Validators.required])
  bad_answer3 = new UntypedFormControl('', [Validators.required])
  imageName = new UntypedFormControl('', [Validators.required])

  courseId!: number
  levelId!: number
  exerciseId!: number

  constructor(
    public dialog: MatDialog,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private dialogService: DialogService,
    private router: Router) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    this.exerciseId = Number(this.route.snapshot.paramMap.get('exerciseId'))
    if(!!this.courseId && !!this.levelId){
      const spinner = this.dialogService.openSpinner()
      this.exerciseService.getExerciseById(this.courseId, this.levelId, this.exerciseId).subscribe({
        next: (res: Exercise) => {

          this.editedData = JSON.parse(JSON.stringify(res))
          this.originalData = JSON.parse(JSON.stringify(res))

          this.question.setValue(this.editedData.question)
          this.expression.setValue(this.editedData.expression)
          this.bad_answer1.setValue(this.editedData.bad_answer1)
          this.bad_answer2.setValue(this.editedData.bad_answer2)
          this.bad_answer3.setValue(this.editedData.bad_answer3)
          this.imageName.setValue(this.editedData.imageName)
        },
        error: error => {
          spinner.close()
          this.snackBarService.openSnackBar(error.message)
          this.router.navigate([`/home/courses/${this.courseId}/levels/${this.levelId}/exercises`])
        },
        complete: () => {
          spinner.close()
        }
      })
    }
  }

  deleteExercise() {

  }

  openDialog(): void {

    const dialogRef = this.dialogService.openDataDiffDialog(this.originalData, this.editedData)


    dialogRef.afterClosed().subscribe(value => {
      if(value) {

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
      }
      else {

      }
      console.log('The dialog was closed');
    });
  }

}
