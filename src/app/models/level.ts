export interface Level {
  id?: number,
  name: string,
  difficulty: number,
  statusName: string,
  exerciseNumber?: number,
  flashcardNumber?: number,
  testQuestionNumber?: number
}

/*
  Validation:
    name: required, min: 2, max: 24
    difficulty: required [0-9]
    statusName: required
    TODO:: NADAĆ WALIDATORY
*/
