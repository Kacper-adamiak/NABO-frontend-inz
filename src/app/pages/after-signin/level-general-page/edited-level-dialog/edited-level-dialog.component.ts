import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LevelService} from "../../../../services/level/level.service";
import {SnackbarService} from "../../../../services/snack-bar/snackbar.service";
import {Level} from "../../../../models/level";

@Component({
  selector: 'app-edited-level-dialog',
  templateUrl: './edited-level-dialog.component.html',
  styleUrls: ['./edited-level-dialog.component.scss']
})
export class EditedLevelDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditedLevelDialogComponent>,
    private levelService: LevelService,
    private snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: {courseId: number ,prevData: Level, editedData: Level},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    console.log("dialog: ",this.data.editedData)
    this.levelService.editLevelById(this.data.courseId ,this.data.prevData.id!, this.data.editedData).subscribe({
      next: (res) => {
        this.snackBarService.openSuccessSnackBar(res.message)
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log("error: ", err)
        if(err.error.name) {
          this.snackBarService.openErrorSnackBar(err.name)
        }
        if(err.error.description) {
          this.snackBarService.openErrorSnackBar(err.description)
        }
        if(err.error.statusName) {
          this.snackBarService.openErrorSnackBar(err.statusName)
        }
        this.dialogRef.close(false);
      }
    })
  }

}
