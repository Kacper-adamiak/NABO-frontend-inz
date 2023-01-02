import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

  newLevel!: Level

  levelForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    difficulty: new FormControl('', [Validators.required]),
  })


  constructor(
    public dialogRef: MatDialogRef<NewLevelDialogComponent>,
    private levelService: LevelService,
    private snackBarService: SnackbarService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: number },
  ) {

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    this.getNewLevelFromForm()
    this.addNewLevel()
  }

  addNewLevel() {
    this.levelService.addLevel(this.data.courseId, this.newLevel).subscribe({
      next: res => {
        if (res.level) {
          this.router.navigate([`/home/courses/${this.data.courseId}/levels`, res.level.id])
        }
        this.dialogRef.close(true)
        this.snackBarService.openSuccessSnackBar(res.message)
      },
      error: err => {
        this.snackBarService.openErrorSnackBar(err.error)
      }
    })
  }

  getNewLevelFromForm() {
    let _newLevel: Level = {
      name: this.levelForm.controls['name'].value!,
      difficulty: Number(this.levelForm.controls['difficulty'].value!),
      statusName: 'STATUS_SUSPENDED'
    }
    this.newLevel = _newLevel
  }

}
