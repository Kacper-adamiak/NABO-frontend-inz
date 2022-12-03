import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog/dialog.service";
import {LevelService} from "../../../services/level/level.service";
import {Level} from "../../../models/level";

@Component({
  selector: 'app-level-general-page',
  templateUrl: './level-general-page.component.html',
  styleUrls: ['./level-general-page.component.scss']
})
export class LevelGeneralPageComponent implements OnInit {

  originalData = {} as Level
  editedData = {} as Level
  name = new UntypedFormControl('', [Validators.required])
  difficulty = new UntypedFormControl('', [Validators.required])
  status = new UntypedFormControl('', [Validators.required])
  courseId!: number
  levelId!: number

  constructor(
    public dialog: MatDialog,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute,
    private levelService: LevelService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    if(!!this.courseId && !!this.levelId){
      const spinner = this.dialogService.openSpinner()
      this.levelService.getLevelById(this.courseId, this.levelId).subscribe({
        next: (res: Level) => {
          this.editedData = res
          this.originalData = JSON.parse(JSON.stringify(res))
          this.setFormFields(this.editedData)
        },
        error: error => {
          spinner.close()
          this.snackBarService.openSnackBar(error.message)
          this.router.navigate([`/home/courses/${this.courseId}/levels`])
        },
        complete: () => {
          spinner.close()
        }
      })
    }
  }

  private setFormFields(level: Level){
    this.name.setValue(level.name)
    this.difficulty.setValue(level.difficulty)
    this.status.setValue(level.statusName)
  }

  onSubmit() {
    this.editedData.name = this.name.value
    this.editedData.difficulty = this.difficulty.value
    this.editedData.statusName = this.status.value
    this.openDialog()
  }

  deleteLevel(){
    if(this.courseId && this.levelId){
      this.levelService.deleteLevelById(this.courseId, this.levelId).subscribe(
        {
          next: (res) => {
            this.snackBarService.openSuccessSnackBar(res.body.message)
            this.router.navigate([`/home/courses/${this.courseId}/levels`])
          },
          error: (err) => {
            console.log("error: ", err)
          }
        }
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialogService.openDataDiffDialog(this.originalData, this.editedData)

    dialogRef.afterClosed().subscribe(value => {
      if(value) {
        this.levelService.editLevelById(this.courseId, this.levelId, this.editedData).subscribe({
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
