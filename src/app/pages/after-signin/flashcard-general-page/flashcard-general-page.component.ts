import {Component, OnInit} from '@angular/core';
import {Flashcard} from "../../../models/flashcard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {FlashcardService} from "../../../services/flashcard.service";
import {Image} from "../../../models/image";
import {LoadingState} from "../../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-flashcard-general-page',
  templateUrl: './flashcard-general-page.component.html',
  styleUrls: ['./flashcard-general-page.component.scss']
})
export class FlashcardGeneralPageComponent implements OnInit {

  dataLoadingState = new LoadingState()

  originalData = {} as Flashcard
  editedData = {} as Flashcard

  selectedImage!: Image

  flashcardForm = new FormGroup({
    expOriginal: new FormControl('', [Validators.required]),
    expTranslation: new FormControl('', [Validators.required]),
    expDescription: new FormControl('', [Validators.required])
  })

  courseId!: number
  levelId!: number
  flashcardId!: number

  constructor(
              public dialog: MatDialog,
              private snackBarService: SnackbarService,
              private route: ActivatedRoute,
              private flashcardService: FlashcardService,
              private dialogService: DialogService,
              private router: Router) { }

  ngOnInit(): void {
    this.getParamsFromRoute()
    this.getFlashcard()
  }

  getParamsFromRoute() {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    this.flashcardId = Number(this.route.snapshot.paramMap.get('flashcardId'))
  }

  getFlashcard() {
    if(!!this.courseId && !!this.levelId && !!this.flashcardId){
      this.dataLoadingState.setLoading()
      this.flashcardService.getFlashcardById(this.courseId, this.levelId, this.flashcardId)
        .pipe(
          finalize(() => {
            this.dataLoadingState.setNotLoading()
          })
        )
        .subscribe({
          next: (res: Flashcard) => {
            const body = res

            this.editedData = JSON.parse(JSON.stringify(body))
            this.originalData = JSON.parse(JSON.stringify(body))

            this.setFormFields()
          },
          error: error => {
            this.snackBarService.openSnackBar(error.message)
            this.router.navigate([`/home/courses/${this.courseId}/levels/${this.levelId}/flashcards`])
          }
        })
    }
  }

  setFormFields(){
    this.flashcardForm.controls['expOriginal'].setValue(this.editedData.expOriginal)
    this.flashcardForm.controls['expTranslation'].setValue(this.editedData.expTranslation)
    this.flashcardForm.controls['expDescription'].setValue(this.editedData.expDescription ?? "")
    this.selectedImage = {name: this.editedData.imageName, url: this.editedData.imageUrl}
  }

  updateEditedFlashcard() {
    this.editedData.expOriginal = this.flashcardForm.controls['expOriginal'].value!
    this.editedData.expTranslation = this.flashcardForm.controls['expTranslation'].value!
    this.editedData.expDescription = this.flashcardForm.controls['expDescription'].value!
    this.editedData.imageName = this.selectedImage.name
    this.editedData.imageUrl = this.selectedImage.url
  }

  saveChanges() {

    this.updateEditedFlashcard()
    const dialogRef = this.dialogService.openDataDiffDialog(this.originalData, this.editedData)
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.flashcardService.editFlashcardById(this.courseId, this.levelId, this.flashcardId, this.editedData).subscribe({
          next: (res) => {
            this.snackBarService.openSuccessSnackBar(res.message)
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
          }
        })
        this.originalData = JSON.parse(JSON.stringify(this.editedData))
      }
    });
  }

  deleteFlashcard() {
    this.flashcardService.deleteFlashcardById(this.courseId, this.levelId, this.flashcardId).subscribe({
      next: (res) => {
        this.snackBarService.openSuccessSnackBar(res.message)
      },
      error: (err) => {
        this.snackBarService.openErrorSnackBar(err)
      },
      complete: () => {
        this.router.navigate([`/home/courses/${this.courseId}/levels/${this.levelId}/flashcards`])
      }
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
