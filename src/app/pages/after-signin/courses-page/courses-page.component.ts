import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, Observable, Observer, tap } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})

export class CoursesPageComponent implements OnInit {

  data!: Course[];

  filterValue = new FormControl('');

  constructor(private courseServ: CourseService ) {
    this.getCourses();
  }

  ngOnInit(): void {

  }


  getCourses() {
    this.courseServ.getCoursesCreatedByAdmin().subscribe((res) => this.data = res.body!)
  }

}
