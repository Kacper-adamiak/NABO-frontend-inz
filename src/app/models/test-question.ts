export interface TestQuestion {
  id?: number,
  question: string,
  answer: string,
  imageName: string,
  imageUrl: string
}
// TODO:: NADAĆ WALIDATORY
/*
  Validation:
    question: required, min: 1, max: 80
    answer: required, min: 1, max: 30
    imageName: required
    imageUrl: required

*/
