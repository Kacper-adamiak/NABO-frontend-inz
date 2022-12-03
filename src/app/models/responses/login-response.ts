import {Role} from "../../enums/role";

export interface LoginResponse {
  id: number,
  token: string,
  type: string,
  refreshToken: string,
  username: string,
  email: string,
  roles: Role[]
}
