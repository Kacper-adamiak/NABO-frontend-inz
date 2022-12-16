import {Pipe, PipeTransform} from '@angular/core';
import {DictionaryService} from "../services/dictionary.service";

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private dictionary: DictionaryService) {
  }

  transform(value: string): string {
    return this.dictionary.translate(value);
  }

}
