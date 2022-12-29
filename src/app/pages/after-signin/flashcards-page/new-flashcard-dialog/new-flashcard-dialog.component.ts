import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../../services/snackbar.service";
import {Flashcard} from "../../../../models/flashcard";
import {FlashcardService} from "../../../../services/flashcard.service";
import {DialogService} from "../../../../services/dialog.service";
import {Image} from "../../../../models/image";

@Component({
  selector: 'app-new-flashcard-dialog',
  templateUrl: './new-flashcard-dialog.component.html',
  styleUrls: ['./new-flashcard-dialog.component.scss']
})
export class NewFlashcardDialogComponent implements OnInit {

  newFlashcard = {} as Flashcard

  selectedImage: Image = {} as Image

  flashcardForm = new FormGroup({
    expOriginal: new FormControl('', [Validators.required, Validators.max(30)]),
    expTranslation: new FormControl('', [Validators.required, Validators.max(30)]),
    expDescription: new FormControl(''),
  })

  constructor(
    public dialogRef: MatDialogRef<NewFlashcardDialogComponent>,
    private flashcardService: FlashcardService,
    private snackBarService: SnackbarService,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: number, levelId: number },
  ) {
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onAccept() {
    this.setNewFlashcardFromForm()
    this.addFlashcard()
  }

  addFlashcard() {
    this.flashcardService.addFlashcard(this.data.courseId, this.data.levelId ,this.newFlashcard).subscribe({
      next: res => {
        this.snackBarService.openSuccessSnackBar(res.message)
        this.dialogRef.close(true)
      },
      error: err => {
        this.snackBarService.openErrorSnackBar(err.message)
      },
      complete: () => {}
    })
  }

  setNewFlashcardFromForm() {
    this.newFlashcard.expOriginal = this.flashcardForm.controls['expOriginal'].value!
    this.newFlashcard.expTranslation = this.flashcardForm.controls['expTranslation'].value!
    this.newFlashcard.expDescription = this.flashcardForm.controls['expDescription'].value!
    this.newFlashcard.imageName = this.selectedImage.name
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
