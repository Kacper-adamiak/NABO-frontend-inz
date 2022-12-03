export interface Image {
  id?: number,
  name: string,
  categoryName?: string,
  url: string
}

/*
  Validation:
    name: required, min: 2, max: 24
    categoryName: required
    TODO:: LOWERCASE MA BYĆ
    TODO:: NADAĆ WALIDATORY
*/
