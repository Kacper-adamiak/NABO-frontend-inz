import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {LevelService} from "../../../services/level.service";
import {Level} from "../../../models/level";
import {LoadingState} from "../../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-level-general-page',
  templateUrl: './level-general-page.component.html',
  styleUrls: ['./level-general-page.component.scss']
})
export class LevelGeneralPageComponent implements OnInit {

  dataLoadingState = new LoadingState()

  originalData = {} as Level
  editedData = {} as Level
  courseId!: number
  levelId!: number

  levelForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    difficulty: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  })

  constructor(
    public dialog: MatDialog,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute,
    private levelService: LevelService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRouteParams()
    this.getLevel()
  }

  getRouteParams() {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
  }

  getLevel() {
    if(!!this.courseId && !!this.levelId){
      this.dataLoadingState.setLoading()
      this.levelService.getLevelById(this.courseId, this.levelId)
        .pipe(
          finalize(() => {
            this.dataLoadingState.setNotLoading()
          })
        )
        .subscribe({
          next: (res: Level) => {
            this.editedData = res
            this.originalData = JSON.parse(JSON.stringify(res))
            this.setFormFields()
          },
          error: error => {
            this.snackBarService.openSnackBar(error.message)
            this.router.navigate([`/home/courses/${this.courseId}/levels`])
          }
        })
    }
  }

  setFormFields(){

    this.levelForm.controls['name'].setValue(this.editedData.name)
    this.levelForm.controls['difficulty'].setValue(String(this.editedData.difficulty))
    this.levelForm.controls['status'].setValue(this.editedData.statusName)
  }

  onSubmit() {
    this.getLevelFromForm()
    this.openDialog()
  }

  getLevelFromForm() {
    this.editedData.name = this.levelForm.controls['name'].value!
    this.editedData.difficulty = Number(this.levelForm.controls['difficulty'].value!)
    this.editedData.statusName = this.levelForm.controls['status'].value!
  }

  deleteLevel(){
    if(this.courseId && this.levelId){
      this.levelService.deleteLevelById(this.courseId, this.levelId).subscribe(
        {
          next: (res) => {
            this.snackBarService.openSuccessSnackBar(res.message)
            this.router.navigate([`/home/courses/${this.courseId}/levels`])
          },
          error: (err) => {

          }
        }
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialogService.openDataDiffDialog(this.originalData, this.editedData)

    dialogRef.afterClosed().subscribe(value => {
      if(value) {
        this.editLevel()
      }
    });
  }

  editLevel() {
    this.levelService.editLevelById(this.courseId, this.levelId, this.editedData).subscribe({
      next: res => {
        this.originalData = JSON.parse(JSON.stringify(this.editedData))
        this.snackBarService.openSuccessSnackBar(res.message)
      },
      error: err => {
        this.snackBarService.openSuccessSnackBar(err.error)
      },
    })
  }

}
