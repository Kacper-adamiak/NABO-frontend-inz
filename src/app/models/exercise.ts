export interface Exercise {
  id?: number,
  question: string,
  answer: string, // dawne expression
  bad_answer1: string,
  bad_answer2: string,
  bad_answer3: string,
  imageName: string,
  imageUrl: string
}

/*
  Validation:
    question: required, min: 1, max: 80
    answer: required, min: 1, max: 30
    bad_answer1: required, min: 1, max: 30
    bad_answer2: required, min: 1, max: 30
    bad_answer3: required, min: 1, max: 30
    TODO:: NADAĆ WALIDATORY
*/
