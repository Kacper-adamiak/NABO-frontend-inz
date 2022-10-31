import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, Observer, of } from 'rxjs';
import { Course } from '../models/course';
import { WebService } from './web.service';

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

  getCourseByName(courseId: number): Observable<HttpResponse<Course>> {
    return this.webService.get<Course>(`/course/${courseId}`)
  }

  editCourseById(courseId: number, editedCourse: Course): Observable<HttpResponse<any>> {
    return this.webService.patch<any>(`/course/edit/${courseId}`, editedCourse)
  }

  deleteCourseById(courseId: number): Observable<HttpResponse<any>> {
     return this.webService.delete<any>(`/course/delete/${courseId}`)
  }





}
