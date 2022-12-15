import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../../services/snackbar.service";
import {Router} from "@angular/router";
import {LevelService} from "../../../../services/level.service";
import {Level} from "../../../../models/level";

@Component({
  selector: 'app-new-level-dialog',
  templateUrl: './new-level-dialog.component.html',
  styleUrls: ['./new-level-dialog.component.scss']
})
export class NewLevelDialogComponent implements OnInit {

  newLevel = {} as Level
  name = new UntypedFormControl('', [Validators.required])
  difficulty = new UntypedFormControl('', [Validators.required])
  status = new UntypedFormControl('', [Validators.required])


  constructor(
    public dialogRef: MatDialogRef<NewLevelDialogComponent>,
    private levelService: LevelService,
    private snackBarService: SnackbarService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: number },

  ) {

  }

  ngOnInit(): void {
    this.status.disable()
    this.status.setValue('STATUS_SUSPENDED')
    this.difficulty.setValue(1)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    this.newLevel.name = this.name.value
    this.newLevel.difficulty = Number(this.difficulty.value)
    this.newLevel.statusName = this.status.value
    console.log(this.newLevel)
    this.levelService.addLevel(this.data.courseId ,this.newLevel).subscribe({
      next: res => {
        this.dialogRef.close(true)
        this.snackBarService.openSuccessSnackBar(res.message)
      },
      error: err => {
        this.dialogRef.close(false)
        this.snackBarService.openErrorSnackBar(err.error)
      }
    })

  }

}
