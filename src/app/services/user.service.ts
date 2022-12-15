import {Injectable} from '@angular/core';
import {WebService} from "./web.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private webService: WebService,
    private http: HttpClient
  ) { }

  getUserData() {
    return this.webService.get<any>('/user')
  }

  getAllCreators() {
    return this.webService.get<any>('/user/creators')
  }

  editUser(payload: any) {
    return this.webService.patch<any>('/user/edit', payload)
  }

  editUserById(userId: number, payload: any) {
    return this.webService.patch<any>(`/user/edit/${userId}`, payload)
  }

  deleteUser() {
    return this.webService.delete<any>('/user/delete')
  }

  deleteUserById(userId: number) {
    return this.webService.delete<any>(`/user/delete${userId}`)
  }

  resetPassword(token: string, userPassword: string): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`http://localhost:8081/api/user/resetPassword`,{
      password: userPassword
    }, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      },)
    })
  }



}
