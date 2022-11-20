import {Injectable} from '@angular/core';
import {WebService} from "../web/web.service";
import {Observable} from "rxjs";
import {TestQuestion} from "../../models/test-question";

@Injectable({
  providedIn: 'root'
})
export class TestQuestionService {

  constructor(private webService: WebService) {

  }

  getAllTestQuestions(courseId: number, levelId: number): Observable<TestQuestion[]> {
    return this.webService.get<TestQuestion[]>(`/course/${courseId}/level/${levelId}/testquestion/all`)
  }

  getTestQuestionById(courseId: number, levelId: number, testQuestionId: number): Observable<TestQuestion> {
    return this.webService.get<TestQuestion>(`/course/${courseId}/level/${levelId}/testquestion/${testQuestionId}`)
  }

  addTestQuestion(courseId: number, levelId: number, newTestQuestion: TestQuestion){
    return this.webService.post<any>(`/course/${courseId}/level/${levelId}/testquestion/add`, {
      question: newTestQuestion.question,
      answer: newTestQuestion.answer,
      imageName: newTestQuestion.imageName
    })
  }

  editTestQuestionById(courseId: number, levelId: number, testQuestionId: number, editedTestQuestion: TestQuestion): Observable<any> {
    return this.webService.patch<any>(`/course/${courseId}/level/${levelId}/testquestion/edit/${testQuestionId}`, {
      question: editedTestQuestion.question,
      answer: editedTestQuestion.answer,
      imageName: editedTestQuestion.imageName
    })
  }

  deleteTestQuestionById(courseId: number, levelId: number, testquestion: number): Observable<any> {
    return this.webService.delete<any>(`/course/${courseId}/level/${levelId}/testquestion/delete/${testquestion}`)
  }
}
