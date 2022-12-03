import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DictionaryService} from "../../../services/dictionary.service";
import * as moment from "moment";


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  public tableDataSource = new MatTableDataSource([]);
  @Input() displayedColumns: string[] = []
  @Input() set data(data: any[]){
    this.setTableDataSource(data)
  }
  @Input() filterFormHidden: boolean = false
  @Input() applyFilter:  (event: Event) => void = (event: Event) => {}
  @Input() paginatorHidden: boolean = false;
  @Output() onRowClick = new EventEmitter()
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dictionaryService: DictionaryService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setTableDataSource(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isDate(object: any) {
    return moment(object, true).isValid();
  }

  onRowClickEmit(row: any) {
    this.onRowClick.emit(row)
  }

}
