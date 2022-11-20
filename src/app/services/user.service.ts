import {Injectable} from '@angular/core';
import {WebService} from "./web/web.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private webService: WebService
  ) { }

  getUserData() {
    return this.webService.get<any>('/user')
  }

  getAllCreators() {
    return this.webService.get<any>('/user/creators')
  }

  editUser(payload: any) {
    return this.webService.post<any>('/user/edit', payload)
  }

  editUserById(userId: number, payload: any) {
    return this.webService.post<any>(`/user/edit/${userId}`, payload)
  }

  deleteUser() {
    return this.webService.delete<any>('/user/delete')
  }

  deleteUserById(userId: number) {
    return this.webService.delete<any>(`/user/delete${userId}`)
  }



}
