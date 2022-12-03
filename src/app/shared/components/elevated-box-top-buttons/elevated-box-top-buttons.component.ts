import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-elevated-box-top-buttons',
  templateUrl: './elevated-box-top-buttons.component.html',
  styleUrls: ['./elevated-box-top-buttons.component.scss']
})
export class ElevatedBoxTopButtonsComponent implements OnInit {

  @Output() rightButtonOnClick = new EventEmitter<any>();
  @Input() leftButtonHidden: boolean = false;
  @Input() rightButtonHidden: boolean = false;
  @Input() rightButtonIcon: string = 'add';

  constructor() { }

  ngOnInit(): void {
  }

  emitOnClick(event: Event) {
    this.rightButtonOnClick.emit(event)
  }

}
