import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UntypedFormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {ExerciseService} from "../../../services/exercise.service";
import {Exercise} from "../../../models/exercise";
import {NewExerciseDialogComponent} from "./new-exercise-dialog/new-exercise-dialog.component";
import {finalize} from "rxjs";
import {LoadingState} from "../../../utils/loading-state";

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
  styleUrls: ['./exercises-page.component.scss']
})
export class ExercisesPageComponent implements OnInit {

  dataLoadingState = new LoadingState()

  displayedColumns: string[] = ["question", "answer", "bad_answer1", "bad_answer2", "bad_answer3", "imageUrl"];
  data: Exercise[] = []
  courseId!: number
  levelId!: number

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterValue = new UntypedFormControl('');

  constructor(
    private exerciseService: ExerciseService,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.courseId = Number(this.activeRoute.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.activeRoute.snapshot.paramMap.get('levelId'))
    this.getExercises();
  }

  ngAfterViewInit(): void {
  }

  getExercises() {
    this.dataLoadingState.setLoading()
    this.exerciseService.getAllExercises(this.courseId, this.levelId)
      .pipe(
        finalize(() => {
          this.dataLoadingState.setNotLoading()
        })
      )
      .subscribe({
      next: res => {
        this.data = res
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewExerciseDialogComponent, {
      width: '90%',
      height: '90%',
      data: {courseId: this.courseId, levelId: this.levelId}
    });

    dialogRef.afterClosed().subscribe(result =>  {
      if(result) {
        this.getExercises()
      }
    });
  }


  rowClicked(event: any) {
    this.router.navigate([`${event.id}`], {relativeTo: this.activeRoute})
  }

}
