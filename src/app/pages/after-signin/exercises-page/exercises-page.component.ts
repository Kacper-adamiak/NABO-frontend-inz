import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UntypedFormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "../../../services/dialog/dialog.service";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {Exercise} from "../../../models/exercise";
import {NewExerciseDialogComponent} from "./new-exercise-dialog/new-exercise-dialog.component";

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
  styleUrls: ['./exercises-page.component.scss']
})
export class ExercisesPageComponent implements OnInit {

  displayedColumns: string[] = ["question", "expression", "bad_answer1", "bad_answer2", "bad_answer3", "imageName", "imageUrl"];
  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>([] as Exercise[])
  courseId!: number
  levelId!: number

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterValue = new UntypedFormControl('');

  constructor(
    private exerciseService: ExerciseService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'))
    this.getExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getExercises() {
    const spinner = this.dialogService.openSpinner()
    this.exerciseService.getAllExercises(this.courseId, this.levelId).subscribe({
      next: res => {
        let data: Exercise[] = res
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.trim().toLowerCase())

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
