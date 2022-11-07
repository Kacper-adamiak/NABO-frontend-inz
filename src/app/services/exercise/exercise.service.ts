import { Injectable } from '@angular/core';
import {WebService} from "../web/web.service";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {Level} from "../../models/level";
import {Exorcise} from "../../models/exorcise";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private webService: WebService) {

  }

  getAllExorcises(courseId: number, levelId: number,): Observable<HttpResponse<Exorcise[]>> {
    return this.webService.get<Exorcise[]>(`/course/${courseId}/level/${levelId}/exercise/all`)
  }

  getExorciseById(courseId: number, levelId: number, exerciseId: number): Observable<HttpResponse<Exorcise>> {
    return this.webService.get<Exorcise>(`/course/${courseId}/level/${levelId}/exercise/edit/${exerciseId}`)
  }

  addExorcise(courseId: number, levelId: number, newExorcise: Exorcise){
    return this.webService.post<any>(`/course/${courseId}/level/${levelId}/exercise/add`, {
      question: newExorcise.question,
      expression: newExorcise.expression,
      bad_answer1: newExorcise.bad_answer1,
      bad_answer2: newExorcise.bad_answer2,
      bad_answer3: newExorcise.bad_answer3,
      imageName: newExorcise.imageName
    })
  }

  editExorciseById(courseId: number, levelId: number, editedExorcise: Exorcise): Observable<HttpResponse<any>> {
    return this.webService.patch<any>(`/course/${courseId}/level/${levelId}/exercise/edit/${editedExorcise.id}`, {
      question: editedExorcise.question,
      expression: editedExorcise.expression,
      bad_answer1: editedExorcise.bad_answer1,
      bad_answer2: editedExorcise.bad_answer2,
      bad_answer3: editedExorcise.bad_answer3,
      imageName: editedExorcise.imageName
    })
  }

  deleteExerciseById(courseId: number, levelId: number, exerciseId: number): Observable<HttpResponse<any>> {
    return this.webService.delete<any>(`/course/${courseId}/level/${levelId}/exercise/delete/${exerciseId}`)
  }
}
