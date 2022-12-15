import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UntypedFormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {LevelService} from "../../../services/level.service";
import {ActivatedRoute} from "@angular/router";
import {Level} from "../../../models/level";
import {NewLevelDialogComponent} from "./new-level-dialog/new-level-dialog.component";
import {DialogService} from "../../../services/dialog.service";
import {LoadingState} from "../../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-levels-page',
  templateUrl: './levels-page.component.html',
  styleUrls: ['./levels-page.component.scss']
})
export class LevelsPageComponent implements OnInit, AfterViewInit {

  dataLoadingState = new LoadingState()

  displayedColumns: string[] = ["name", "difficulty", "statusName" ];
  dataSource: MatTableDataSource<Level> = new MatTableDataSource<Level>([] as Level[])
  courseId!: number

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterValue = new UntypedFormControl('');

  constructor(
    private levelService: LevelService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.getLevels();
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.difficulty.toString().includes(filter) || data.statusName.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getLevels() {
    this.dataLoadingState.setLoading()
    this.levelService.getAllLevels(this.courseId)
      .pipe(
        finalize(() => {
          this.dataLoadingState.setNotLoading()
        })
      )
      .subscribe({
      next: res => {
        let data: Level[] = res
        this.dataSource.data = data
      },
      error: err => {
      },
      complete: () => {
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewLevelDialogComponent, {
      width: '90%',
      height: '90%',
      data: {courseId: this.courseId}
    });

    dialogRef.afterClosed().subscribe(result =>  {
      if(result){
        this.getLevels()
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
