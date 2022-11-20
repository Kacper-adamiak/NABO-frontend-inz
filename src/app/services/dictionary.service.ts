import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private readonly translateDataKeyMap: Map<string, string> = new Map<string, string>([
    ['name','nazwa'],
    ['description','opis'],
    ['categoryName','kategoria'],
    ['statusName','status'],
    ['difficulty','poziom trudności'],
    ['expOriginal','wyrażenie [Ang]'],
    ['expTranslation','tłumaczenie [Pol]'],
    ['expDescription','opis'],
    ['question', 'pytanie'],
    ['expression', 'odpowiedź'],
    ['bad_answer1', 'zła odpowiedź [1]'],
    ['bad_answer2', 'zła odpowiedź [2]'],
    ['bad_answer3', 'zła odpowiedź [3]'],
    ['answer', 'odpowiedź'],
    ['imageName', 'nazwa zdjęcia'],
  ])

  constructor() { }

  translate(key: string) {
    const translation = this.translateDataKeyMap.get(key)
    if(translation) return translation
    else return key
  }
}
