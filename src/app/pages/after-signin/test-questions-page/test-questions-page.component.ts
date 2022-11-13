import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UntypedFormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "../../../services/dialog/dialog.service";
import {TestQuestionService} from "../../../services/test-question/test-question.service";
import {TestQuestion} from "../../../models/test-question";
import {NewTestQuestionDialogComponent} from "./new-test-question-dialog/new-test-question-dialog.component";

@Component({
  selector: 'app-test-questions-page',
  templateUrl: './test-questions-page.component.html',
  styleUrls: ['./test-questions-page.component.scss']
})
export class TestQuestionsPageComponent implements OnInit {

  displayedColumns: string[] = ["question", "answer", "imageUrl"];
  dataSource: MatTableDataSource<TestQuestion> = new MatTableDataSource<TestQuestion>([] as TestQuestion[])
  courseId!: number
  levelId!: number

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterValue = new UntypedFormControl('');

  constructor(
    private testQuestionService: TestQuestionService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    this.getTestQuestions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTestQuestions() {
    const spinner = this.dialogService.openSpinner()
    this.testQuestionService.getAllTestQuestions(this.courseId, this.levelId).subscribe({
      next: res => {
        this.dataSource.data = res
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
    const dialogRef = this.dialog.open(NewTestQuestionDialogComponent, {
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
