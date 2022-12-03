import {Role} from "../enums/role";

export interface User {
  id: number,
  login: string,
  email: string,
  isActive: boolean,
  firstName: string,
  lastName: string,
  creationDate: Date,
  roles: Role[],
}

/*
  login: required min: 3, max: 20
  email: required max: 50
  firstName: min: 3, max: 20
  lastName: min: 3, max: 26
  TODO:: NADAĆ WALIDATORY
*/
