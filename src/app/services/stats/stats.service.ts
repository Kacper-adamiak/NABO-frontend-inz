import {Injectable} from '@angular/core';
import {WebService} from "../web/web.service";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(
    private webService: WebService
  ) { }

  getCoursesWithStats() {
    return this.webService.get<any>('/stats/courses')
  }

  getAllCoursesWithStats() {
    return this.webService.get<any>('/stats/coursesforall')
  }

  getCourseNewUsersPerDay(courseId: number) {
    return this.webService.get<any[]>(`/stats/newusersperday/${courseId}`)
  }
}
