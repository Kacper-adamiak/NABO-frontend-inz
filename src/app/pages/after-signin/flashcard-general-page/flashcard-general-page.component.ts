import {Component, OnInit} from '@angular/core';
import {Flashcard} from "../../../models/flashcard";
import {UntypedFormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog/dialog.service";
import {FlashcardService} from "../../../services/flashcard/flashcard.service";

@Component({
  selector: 'app-flashcard-general-page',
  templateUrl: './flashcard-general-page.component.html',
  styleUrls: ['./flashcard-general-page.component.scss']
})
export class FlashcardGeneralPageComponent implements OnInit {

  orginalData = {} as Flashcard
  editedData = {} as Flashcard
  expOriginal = new UntypedFormControl('', [Validators.required])
  expTranslation = new UntypedFormControl('', [Validators.required])
  expDescription = new UntypedFormControl('', [Validators.required])
  imageName = new UntypedFormControl('', [Validators.required])

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
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    this.flashcardId = Number(this.route.snapshot.paramMap.get('flashcardId'))
    if(!!this.courseId && !!this.levelId){
      const spinner = this.dialogService.openSpinner()
      this.flashcardService.getFlashcardById(this.courseId, this.levelId, this.flashcardId).subscribe({
        next: (res: Flashcard) => {
          const body = res

          this.editedData = JSON.parse(JSON.stringify(body))
          this.orginalData = JSON.parse(JSON.stringify(body))

          this.expOriginal.setValue(this.editedData.expOriginal)
          this.expTranslation.setValue(this.editedData.expTranslation)
          this.expDescription.setValue(this.editedData.expDescription)
          this.imageName.setValue(this.editedData.imageName)
        },
        error: error => {
          spinner.close()
          this.snackBarService.openSnackBar(error.message)
          this.router.navigate([`/home/courses/${this.courseId}/levels/${this.levelId}/flashcards`])
        },
        complete: () => {
          spinner.close()
        }
      })
    }
  }

  onSubmit() {

  }

  deleteCourse() {

  }

}
