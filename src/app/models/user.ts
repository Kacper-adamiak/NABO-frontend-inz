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

