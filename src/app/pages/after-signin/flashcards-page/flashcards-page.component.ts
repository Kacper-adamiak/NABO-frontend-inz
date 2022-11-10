import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UntypedFormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "../../../services/dialog/dialog.service";
import {FlashcardService} from "../../../services/flashcard/flashcard.service";
import {Flashcard} from "../../../models/flashcard";
import {NewFlashcardDialogComponent} from "./new-flashcard-dialog/new-flashcard-dialog.component";

@Component({
  selector: 'app-flashcards-page',
  templateUrl: './flashcards-page.component.html',
  styleUrls: ['./flashcards-page.component.scss']
})
export class FlashcardsPageComponent implements OnInit {

  displayedColumns: string[] = ["expOriginal", "expTranslation", "expDescription", "imageName", "imageUrl"];
  dataSource: MatTableDataSource<Flashcard> = new MatTableDataSource<Flashcard>([] as Flashcard[])
  courseId!: number
  levelId!: number

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterValue = new UntypedFormControl('');

  constructor(
    private flashcardService: FlashcardService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    this.getFlashcards();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getFlashcards() {
    const spinner = this.dialogService.openSpinner()
    this.flashcardService.getAllFlashcards(this.courseId, this.levelId).subscribe({
      next: res => {
        let data: Flashcard[] = res.body!
        this.dataSource.data = data
      },
      error: err => {
        spinner.close()
      },
      complete: () => {
        spinner.close()
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
      console.log(`The dialog was closed ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.trim().toLowerCase())

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
