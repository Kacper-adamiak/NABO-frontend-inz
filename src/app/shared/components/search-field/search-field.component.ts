import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {

  @Output() onKeyUp = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }

  emitOnKeyUp(event: Event) {
    this.onKeyUp.emit(event);
  }

}
