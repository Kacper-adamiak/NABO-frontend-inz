import {Injectable} from '@angular/core';
import {WebService} from "./web.service";
import {Observable} from "rxjs";
import {Flashcard} from "../models/flashcard";

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  constructor(private webService: WebService) {

  }

  getAllFlashcards(courseId: number, levelId: number): Observable<Flashcard[]> {
    return this.webService.get<Flashcard[]>(`/course/${courseId}/level/${levelId}/flashcard/all`)
  }

  getFlashcardById(courseId: number, levelId: number, flashcardId: number): Observable<Flashcard> {
    return this.webService.get<Flashcard>(`/course/${courseId}/level/${levelId}/flashcard/${flashcardId}`)
  }

  addFlashcard(courseId: number, levelId: number, newFlashcard: Flashcard){
    return this.webService.post<any>(`/course/${courseId}/level/${levelId}/flashcard/add`, {
      expOriginal: newFlashcard.expOriginal,
      expTranslation: newFlashcard.expTranslation,
      expDescription: newFlashcard.expDescription,
      imageName: newFlashcard.imageName
    })
  }

  editFlashcardById(courseId: number, levelId: number, flashcardId: number, editedFlashcard: Flashcard): Observable<any> {
    return this.webService.patch<any>(`/course/${courseId}/level/${levelId}/flashcard/edit/${flashcardId}`, {
      expOriginal: editedFlashcard.expOriginal,
      expTranslation: editedFlashcard.expTranslation,
      expDescription: editedFlashcard.expDescription,
      imageName: editedFlashcard.imageName
    })
  }

  deleteFlashcardById(courseId: number, levelId: number, flashcardId: number): Observable<any> {
    return this.webService.delete<any>(`/course/${courseId}/level/${levelId}/flashcard/delete/${flashcardId}`)
  }
}
