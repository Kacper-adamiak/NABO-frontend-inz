import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() displayedColumns: string[] = []
  @Input() set data(data: any[]){
    this.setTableDataSource(data)
  }
  @Input() filterFormHidden: boolean = false
  @Input() paginatorHidden: boolean = false;
  @Output() onRowClick = new EventEmitter()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])

  constructor() {
  }

  ngOnInit(): void {

  }

  setTableDataSource(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClickEmit(row: any) {
    this.onRowClick.emit(row)
  }

  isDate(object: any) {
    let dateInputsKeys = ['modified', 'created']
    return dateInputsKeys.includes(object)
  }

}
