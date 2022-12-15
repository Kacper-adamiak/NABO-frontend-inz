import {Injectable} from '@angular/core';
import {WebService} from "./web.service";
import {NewUsersPerDayResponse} from "../models/responses/new-users-per-day-response";

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
    return this.webService.get<NewUsersPerDayResponse>(`/stats/newusersperday/${courseId}`)
  }
}
