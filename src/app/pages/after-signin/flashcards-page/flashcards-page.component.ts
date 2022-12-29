import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {FlashcardService} from "../../../services/flashcard.service";
import {Flashcard} from "../../../models/flashcard";
import {NewFlashcardDialogComponent} from "./new-flashcard-dialog/new-flashcard-dialog.component";
import {finalize} from "rxjs";
import {LoadingState} from "../../../utils/loading-state";

@Component({
  selector: 'app-flashcards-page',
  templateUrl: './flashcards-page.component.html',
  styleUrls: ['./flashcards-page.component.scss']
})
export class FlashcardsPageComponent implements OnInit {

  dataLoadingState = new LoadingState()

  displayedColumns: string[] = ["expOriginal", "expTranslation", "expDescription", "imageUrl"];
  data: Flashcard[] = []
  courseId!: number
  levelId!: number

  filterValue = new FormControl('');

  constructor(
    private flashcardService: FlashcardService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getFlashcards();
  }

  getFlashcards() {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    this.dataLoadingState.setLoading()
    this.flashcardService.getAllFlashcards(this.courseId, this.levelId)
      .pipe(
        finalize(() => {
          this.dataLoadingState.setNotLoading()
        })
      )
      .subscribe({
      next: res => {
        this.data = res
      },
      error: err => {
      },
      complete: () => {
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewFlashcardDialogComponent, {
      width: '90%',
      height: '90%',
      data: {courseId: this.courseId, levelId: this.levelId}
    });

    dialogRef.afterClosed().subscribe(result =>  {
      if(result) {
        this.getFlashcards()
      }
    });
  }

  rowClicked(event: any) {
    this.router.navigate([`${event.id}`], {relativeTo: this.route})
  }

}
