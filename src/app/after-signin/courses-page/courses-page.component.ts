import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})

export class CoursesPageComponent implements OnInit {

  data: data4[] = [
    {name1: "name1", name2: "name2", name3: "name3", name4: "name4"},
    {name1: "name11", name2: "name22", name3: "name33", name4: "name44"},
    {name1: "name111", name2: "name222", name3: "name333", name4: "name444"},
    {name1: "name12", name2: "name22", name3: "name32", name4: "name42"},
    {name1: "name112", name2: "name222", name3: "name332", name4: "name442"},
    {name1: "name1112", name2: "name2222", name3: "name3332", name4: "name4442"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

export interface data4 {
  name1: string;
  name2: string;
  name3: string;
  name4: string;
}
