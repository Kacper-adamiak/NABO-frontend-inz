import {Injectable} from '@angular/core';
import {WebService} from "../web/web.service";
import {Observable} from "rxjs";
import {Exercise} from "../../models/exercise";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private webService: WebService) {

  }

  getAllExercises(courseId: number, levelId: number,): Observable<Exercise[]> {
    return this.webService.get<Exercise[]>(`/course/${courseId}/level/${levelId}/exercise/all`)
  }

  getExerciseById(courseId: number, levelId: number, exerciseId: number): Observable<Exercise> {
    return this.webService.get<Exercise>(`/course/${courseId}/level/${levelId}/exercise/edit/${exerciseId}`)
  }

  addExercise(courseId: number, levelId: number, newExorcise: Exercise){
    return this.webService.post<any>(`/course/${courseId}/level/${levelId}/exercise/add`, {
      question: newExorcise.question,
      expression: newExorcise.expression,
      bad_answer1: newExorcise.bad_answer1,
      bad_answer2: newExorcise.bad_answer2,
      bad_answer3: newExorcise.bad_answer3,
      imageName: newExorcise.imageName
    })
  }

  editExerciseById(courseId: number, levelId: number, editedExorcise: Exercise): Observable<any> {
    return this.webService.patch<any>(`/course/${courseId}/level/${levelId}/exercise/edit/${editedExorcise.id}`, {
      question: editedExorcise.question,
      expression: editedExorcise.expression,
      bad_answer1: editedExorcise.bad_answer1,
      bad_answer2: editedExorcise.bad_answer2,
      bad_answer3: editedExorcise.bad_answer3,
      imageName: editedExorcise.imageName
    })
  }

  deleteExerciseById(courseId: number, levelId: number, exerciseId: number): Observable<any> {
    return this.webService.delete<any>(`/course/${courseId}/level/${levelId}/exercise/delete/${exerciseId}`)
  }
}
