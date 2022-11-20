import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../../../../services/user.service";

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.scss']
})
export class UsersPanelComponent implements OnInit {

  usersDisplayedColumns: string[] = ["login", 'email', 'firstName', 'lastName', 'actions' ];
  usersDataSource: MatTableDataSource<any> = new MatTableDataSource<any>([] as any)
  @ViewChild('paginatorUsers') paginatorUsers!: MatPaginator;
  @ViewChild('sortUsers') sortUsers!: MatSort;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getCreators()
  }

  ngAfterViewInit(): void {
    this.usersDataSource.paginator = this.paginatorUsers;
    this.usersDataSource.sort = this.sortUsers;
  }

  getCreators() {
    this.userService.getAllCreators().subscribe({
      next: value => {
        this.usersDataSource.data = value
      }
    })
  }

  applyFilterUsers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.usersDataSource.paginator) {
      this.usersDataSource.paginator.firstPage();
    }
  }

}
