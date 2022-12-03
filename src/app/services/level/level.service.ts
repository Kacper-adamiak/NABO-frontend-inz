import {Injectable} from '@angular/core';
import {WebService} from "../web/web.service";
import {Observable} from "rxjs";
import {Level} from "../../models/level";

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private webService: WebService) {

  }

  getAllLevels(courseId: number): Observable<Level[]> {
    return this.webService.get<Level[]>(`/course/${courseId}/level/all`)
  }

  getLevelById(courseId: number, levelId: number): Observable<Level> {
    return this.webService.get<Level>(`/course/${courseId}/level/${levelId}`)
  }

  addLevel(courseId: number, newLevel: Level){
    return this.webService.post<any>(`/course/${courseId}/level/add`, {
      name: newLevel.name,
      difficulty: newLevel.difficulty,
      statusName: newLevel.statusName
    })
  }

  editLevelById(courseId: number, levelId: number, editedLevel: Level): Observable<any> {
    return this.webService.patch<any>(`/course/${courseId}/level/edit/${levelId}`, {
      name: editedLevel.name,
      difficulty: editedLevel.difficulty,
      statusName: editedLevel.statusName
    })
  }

  deleteLevelById(courseId: number, levelId: number): Observable<any> {
    return this.webService.delete<any>(`/course/${courseId}/level/delete/${levelId}`)
  }
}
