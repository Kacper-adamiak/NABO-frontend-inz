import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortable} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../services/dialog.service";
import {StatsService} from "../../../services/stats.service";
import {AuthService} from "../../../services/auth.service";
import {LoadingState} from "../../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {

  dataLoadingState = new LoadingState()

  displayedColumns: string[] = ["courseName", "usersInCourse", 'avgScoreInCourse'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private statsService: StatsService,
    public dialog: MatDialog,
    public dialogService: DialogService,
    public authService: AuthService,
    private cdref: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.sort.sort(({ id: 'usersInCourse', start: 'desc'}) as MatSortable)
    this.dataSource.sort = this.sort;
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.getCourses();
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.courseName.toLowerCase().includes(filter);
    };

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.trim().toLowerCase())

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCourses() {

    this.authService.isAdmin$.subscribe({
      next: value => {
        if(value) {
          this.dataLoadingState.setLoading()
          this.displayedColumns.push('author')
          this.statsService.getAllCoursesWithStats()
            .pipe(
              finalize(() => {
                this.dataLoadingState.setNotLoading()
              })
            )
            .subscribe({
            next: res => {
              this.dataSource.data = res
            },
            error: err => {
            },
            complete: () => {
            }
          })
        }else {
          this.dataLoadingState.setLoading()
          this.statsService.getCoursesWithStats()
            .pipe(
              finalize(() => {
                this.dataLoadingState.setNotLoading()
              })
            )
            .subscribe({
            next: res => {
              this.dataSource.data = res
            },
            error: err => {
            },
            complete: () => {
            }
          })
        }
      }
    })

  }

}
