import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog/dialog.service";
import {HttpResponse} from "@angular/common/http";
import {LevelService} from "../../../services/level/level.service";
import {Level} from "../../../models/level";
import {EditedLevelDialogComponent} from "./edited-level-dialog/edited-level-dialog.component";

@Component({
  selector: 'app-level-general-page',
  templateUrl: './level-general-page.component.html',
  styleUrls: ['./level-general-page.component.scss']
})
export class LevelGeneralPageComponent implements OnInit {

  prevData = {} as Level
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
        next: (res: HttpResponse<Level>) => {
          const body = res.body!

          this.editedData = JSON.parse(JSON.stringify(body))
          this.prevData = JSON.parse(JSON.stringify(body))

          this.name.setValue(this.editedData.name)
          this.difficulty.setValue(this.editedData.difficulty)
          this.status.setValue(this.editedData.statusName)
        },
        error: error => {
          this.snackBarService.openSnackBar(error.error.message)
          this.router.navigate([`/home/courses/${this.courseId}/levels`])
        },
        complete: () => {
          spinner.close()
        }
      })
    }
  }



  onSubmit() {
    this.editedData.name = this.name.value
    this.editedData.difficulty = this.difficulty.value
    this.editedData.statusName = this.status.value
    this.openDialog()
  }

  deleteCourse(){
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
    const dialogRef = this.dialog.open(EditedLevelDialogComponent, {
      width: '50%',
      data: {courseId: this.courseId, prevData: this.prevData, editedData: this.editedData},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
