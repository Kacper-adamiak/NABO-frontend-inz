import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UntypedFormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {TestQuestionService} from "../../../services/test-question.service";
import {TestQuestion} from "../../../models/test-question";
import {NewTestQuestionDialogComponent} from "./new-test-question-dialog/new-test-question-dialog.component";
import {LoadingState} from "../../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-test-questions-page',
  templateUrl: './test-questions-page.component.html',
  styleUrls: ['./test-questions-page.component.scss']
})
export class TestQuestionsPageComponent implements OnInit {

  dataLoadingState = new LoadingState()

  displayedColumns: string[] = ["question", "answer", "imageUrl"];
  data: TestQuestion[] = []
  courseId!: number
  levelId!: number

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterValue = new UntypedFormControl('');

  constructor(
    private testQuestionService: TestQuestionService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTestQuestions();
  }

  getTestQuestions() {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    this.dataLoadingState.setLoading()
    this.testQuestionService.getAllTestQuestions(this.courseId, this.levelId)
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
    const dialogRef = this.dialog.open(NewTestQuestionDialogComponent, {
      width: '90%',
      height: '90%',
      data: {courseId: this.courseId, levelId: this.levelId}
    });

    dialogRef.afterClosed().subscribe(result =>  {
      if(result){
        this.getTestQuestions()
      }
    });
  }

  rowClicked(event: any) {
    this.router.navigate([`${event.id}`], {relativeTo: this.route})
  }

}
