import {Component, Inject, OnInit} from '@angular/core';
import {Level} from "../../../../models/level";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LevelService} from "../../../../services/level/level.service";
import {SnackbarService} from "../../../../services/snack-bar/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Flashcard} from "../../../../models/flashcard";
import {FlashcardService} from "../../../../services/flashcard/flashcard.service";

@Component({
  selector: 'app-new-flashcard-dialog',
  templateUrl: './new-flashcard-dialog.component.html',
  styleUrls: ['./new-flashcard-dialog.component.scss']
})
export class NewFlashcardDialogComponent implements OnInit {

  newFlashcard = {} as Flashcard
  expOriginal = new FormControl('', [Validators.required])
  expTranslation = new FormControl('', [Validators.required])
  expDescription = new FormControl('', [Validators.required])
  imageName = new FormControl('', [Validators.required])

  constructor(
    public dialogRef: MatDialogRef<NewFlashcardDialogComponent>,
    private flashcardService: FlashcardService,
    private snackBarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: number, levelId: number },
  ) {
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    this.newFlashcard.expOriginal = this.expOriginal.value
    this.newFlashcard.expTranslation = this.expTranslation.value
    this.newFlashcard.expDescription = this.expTranslation.value
    this.newFlashcard.imageName = this.imageName.value

    this.flashcardService.addFlashcard(this.data.courseId, this.data.levelId ,this.newFlashcard).subscribe({
      next: res => {
        let tempFlashcard: Flashcard = res.body!;
        this.snackBarService.openSuccessSnackBar(res.body!.message!)
      },
      error: err => {
        this.snackBarService.openErrorSnackBar(err.error)
      }
    })
    this.dialogRef.close()
  }

}
