export interface Flashcard {
  id?: number,
  expOriginal: string,
  expTranslation: string,
  expDescription?: string,
  imageName: string,
  imageUrl: string
}

/*
  Validation:
    expOriginal: required, min: 1, max: 30
    expTranslation: required, min: 1, max: 30
    expDescription: min: 6, max: 80 ?
    imageName: required
    imageUrl: required
    TODO:: NADAĆ WALIDATORY
*/
