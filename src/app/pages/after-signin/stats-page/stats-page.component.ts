import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../services/dialog/dialog.service";
import {StatsService} from "../../../services/stats/stats.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {

  displayedColumns: string[] = ["courseName", "usersInCourse", 'avgScoreInCourse'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private statsService: StatsService,
    public dialog: MatDialog,
    public dialogService: DialogService,
    public authService: AuthService) {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getCourses();
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.categoryName.toLowerCase().includes(filter) || data.statusName.toLowerCase().includes(filter) || data.authorLogin.toLowerCase().includes(filter);
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

    let spinner = this.dialogService.openSpinner()
    this.authService.isSuperAdmin$.subscribe({
      next: value => {
        if(value) {
          this.displayedColumns.push('author')
          this.statsService.getAllCoursesWithStats().subscribe({
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
        }else {
          this.statsService.getCoursesWithStats().subscribe({
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
      }
    })

  }

}
