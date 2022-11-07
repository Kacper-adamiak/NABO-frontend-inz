import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, Observer, of } from 'rxjs';
import { Course } from '../../models/course';
import { WebService } from '../web/web.service';
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private webService: WebService) {

  }

  getAllCourses(): Observable<HttpResponse<Course[]>> {
    return this.webService.get<Course[]>('/course/all')
  }

  getCoursesCreatedByAdmin(): Observable<HttpResponse<Course[]>> {
    return this.webService.get<Course[]>('/course/admin')
  }

  getCourseById(courseId: number): Observable<HttpResponse<Course>> {
    return this.webService.get<Course>(`/course/${courseId}`)
  }

  addCourse(newCourse: Course){
    return this.webService.post<any>(`/course/add`, {
      name: newCourse.name,
      description: newCourse.description,
      categoryName: "KAT1",
      statusName: "STATUS_SUSPENDED"
    })
  }

  editCourseById(courseId: number, editedCourse: Course): Observable<HttpResponse<any>> {
    return this.webService.patch<any>(`/course/edit/${courseId}`, {
      name: editedCourse.name,
      description: editedCourse.description,
      categoryName: editedCourse.categoryName,
      statusName: editedCourse.statusName
    })
  }

  deleteCourseById(courseId: number): Observable<HttpResponse<any>> {
     return this.webService.delete<any>(`/course/delete/${courseId}`)
  }





}
