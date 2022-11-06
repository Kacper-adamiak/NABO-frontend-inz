import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Course} from "../../../models/course";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";
import {CourseService} from "../../../services/course/course.service";
import {MatDialog} from "@angular/material/dialog";
import {NewCourseDialogComponent} from "../courses-page/new-course-dialog/new-course-dialog.component";
import {LevelService} from "../../../services/level/level.service";
import {ActivatedRoute} from "@angular/router";
import {Level} from "../../../models/level";
import {NewLevelDialogComponent} from "./new-level-dialog/new-level-dialog.component";

@Component({
  selector: 'app-levels-page',
  templateUrl: './levels-page.component.html',
  styleUrls: ['./levels-page.component.scss']
})
export class LevelsPageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ["name", "difficulty", "status" ];
  dataSource: MatTableDataSource<Level> = new MatTableDataSource<Level>([] as Level[])
  courseId!: number

  @ViewChild(MatSort) sort!: MatSort;

  filterValue = new FormControl('');

  constructor(
    private levelService: LevelService,
    public dialog: MatDialog,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    console.log("level",this.route.snapshot.paramMap.get('courseId'))
    this.getLevels();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getLevels() {
    this.levelService.getAllLevels(this.courseId).subscribe(
      res => {
        let data: Level[] = res.body!
        this.dataSource.data = data
      }
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewLevelDialogComponent, {
      width: '90%',
      height: '90%',
      data: {courseId: this.courseId}
    });

    dialogRef.afterClosed().subscribe(result =>  {
      console.log(`The dialog was closed ${result}`);
      this.getLevels();
    });
  }

  addNewCourse() {
    this.openDialog()
  }

}
