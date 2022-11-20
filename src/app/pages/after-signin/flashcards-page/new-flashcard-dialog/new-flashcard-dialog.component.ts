import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../../services/snack-bar/snackbar.service";
import {Flashcard} from "../../../../models/flashcard";
import {FlashcardService} from "../../../../services/flashcard/flashcard.service";
import {DialogService} from "../../../../services/dialog/dialog.service";
import {Image} from "../../../../models/image";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-flashcard-dialog',
  templateUrl: './new-flashcard-dialog.component.html',
  styleUrls: ['./new-flashcard-dialog.component.scss']
})
export class NewFlashcardDialogComponent implements OnInit {

  newFlashcard = {} as Flashcard
  expOriginal = new UntypedFormControl('', [Validators.required])
  expTranslation = new UntypedFormControl('', [Validators.required])
  expDescription = new UntypedFormControl('', [Validators.required])
  selectedImage!: Image

  constructor(
    public dialogRef: MatDialogRef<NewFlashcardDialogComponent>,
    private flashcardService: FlashcardService,
    private snackBarService: SnackbarService,
    private dialogService: DialogService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: number, levelId: number },
  ) {
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onAccept() {
    this.newFlashcard.expOriginal = this.expOriginal.value
    this.newFlashcard.expTranslation = this.expTranslation.value
    this.newFlashcard.expDescription = this.expTranslation.value
    this.newFlashcard.imageName = this.selectedImage.name

    this.flashcardService.addFlashcard(this.data.courseId, this.data.levelId ,this.newFlashcard).subscribe({
      next: res => {
        let tempFlashcard: Flashcard = res.flashcard;
        this.snackBarService.openSuccessSnackBar(res.message)
        this.dialogRef.close(true)
      },
      error: err => {
        this.snackBarService.openErrorSnackBar(err)
        this.dialogRef.close(false)
      },
      complete: () => {}
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
