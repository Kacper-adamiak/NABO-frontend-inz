export interface Course {
  id?: number;
  created?: Date;
  modified?: Date;
  description: string;
  authorId: number;
  authorLogin: number;
  name: string;
  statusName: string;
  categoryName: string
}

/*
  Validation:
    name: required, min: 4, max: 24
    TODO:: LOWERCASE MA BYĆ
    description: required: min: 30, max: 255
    TODO:: NADAĆ WALIDATORY
*/
