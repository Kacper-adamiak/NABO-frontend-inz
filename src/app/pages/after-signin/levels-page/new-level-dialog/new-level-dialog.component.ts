import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../../services/snack-bar/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LevelService} from "../../../../services/level/level.service";
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

  constructor(
    public dialogRef: MatDialogRef<NewLevelDialogComponent>,
    private levelService: LevelService,
    private snackBarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: number },

  ) {

  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    this.newLevel.name = this.name.value
    this.newLevel.difficulty = Number(this.difficulty.value)
    console.log(this.newLevel)
    this.levelService.addLevel(this.data.courseId ,this.newLevel).subscribe({
      next: res => {
        console.log("leveleadd", res)
        let tempLevel: Level = res;
        this.snackBarService.openSuccessSnackBar(res.message)
      },
      error: err => {
        console.log("leveleadd err", err.error)
        this.snackBarService.openErrorSnackBar(err.error)
      }
    })
    this.dialogRef.close()
  }

}
