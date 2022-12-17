import {Role} from "../../enums/role";

export interface LoginResponse {
  id: number,
  email: string,
  refreshToken: string,
  roles: Role[],
  token: string,
  type: string,
  username: string,
}
