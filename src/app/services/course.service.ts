import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from '../models/course';
import {WebService} from './web.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private webService: WebService) {

  }

  getAllCourses(): Observable<Course[]> {
    return this.webService.get<Course[]>('/course/all')
  }

  getCoursesCreatedByAdmin(): Observable<Course[]> {
    return this.webService.get<Course[]>('/course/creator')
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.webService.get<Course>(`/course/${courseId}`)
  }

  addCourse(newCourse: Course){
    return this.webService.post<any>(`/course/add`, {
      name: newCourse.name,
      description: newCourse.description,
      categoryName: newCourse.categoryName,
      statusName: "STATUS_SUSPENDED"
    })
  }

  editCourseById(courseId: number, editedCourse: Course): Observable<any> {
    return this.webService.patch<any>(`/course/edit/${courseId}`, {
      name: editedCourse.name,
      description: editedCourse.description,
      categoryName: editedCourse.categoryName,
      statusName: editedCourse.statusName
    })
  }

  deleteCourseById(courseId: number): Observable<any> {
     return this.webService.delete<any>(`/course/delete/${courseId}`)
  }





}
