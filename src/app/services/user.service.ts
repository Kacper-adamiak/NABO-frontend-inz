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

}
