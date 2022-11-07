import { Injectable } from '@angular/core';
import {WebService} from "../web/web.service";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {Level} from "../../models/level";
import {Flashcard} from "../../models/flashcard";
import {TestQuestion} from "../../models/test-question";

@Injectable({
  providedIn: 'root'
})
export class TestQuestionService {

  constructor(private webService: WebService) {

  }

  getAllTestQuestions(courseId: number, levelId: number): Observable<HttpResponse<TestQuestion[]>> {
    return this.webService.get<TestQuestion[]>(`/course/${courseId}/level/${levelId}/testquestion/all`)
  }

  getTestQuestionById(courseId: number, levelId: number, testQuestionId: number): Observable<HttpResponse<TestQuestion>> {
    return this.webService.get<TestQuestion>(`/course/${courseId}/level/${levelId}/testquestion/${testQuestionId}`)
  }

  addTestQuestion(courseId: number, levelId: number, newTestQuestion: TestQuestion){
    return this.webService.post<any>(`/course/${courseId}/level/${levelId}/testquestion/add`, {
      question: newTestQuestion.question,
      answer: newTestQuestion.answer,
      imageName: newTestQuestion.imageName
    })
  }

  editTestQuestionById(courseId: number, levelId: number, testQuestionId: number, editedTestQuestion: TestQuestion): Observable<HttpResponse<any>> {
    return this.webService.patch<any>(`/api/course/${courseId}/level/${levelId}/testquestion/edit/${testQuestionId}`, {
      question: editedTestQuestion.question,
      answer: editedTestQuestion.answer,
      imageName: editedTestQuestion.imageName
    })
  }

  deleteTestQuestionById(courseId: number, levelId: number, testquestion: number): Observable<HttpResponse<any>> {
    return this.webService.delete<any>(`/api/course/${courseId}/level/${levelId}/testquestion/delete/${testquestion}`)
  }
}
