import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observer, tap } from 'rxjs';
import { WebService } from '../web/web.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private webService: WebService, private router: Router) {
    this.updateIsLoggedIn()
   }

   updateIsLoggedIn() {
     const token = localStorage.getItem('access_token');
     this._isLoggedIn$.next(!!token);
   }

  signin(login: String, password: String) {
    return this.webService.post<signinResponse>("/auth/signin", {
      login: login,
      password: password
    }).pipe(tap((response: any) => {
      this._isLoggedIn$.next(true);
      localStorage.setItem('access_token', response.body?.token || "");
      this.router.navigate(["/home"])
    }))
  }

  signup(login: String, password: String) {
    this.webService.post("/auth/signup", {
      login: login,
      password: password
    }).subscribe((res) => {
      console.log("signup: ", res);
    })
  }


}

interface signinResponse
{
  email: string
  id: number
  refreshToken: string
  roles: string[]
  token: string
  type: string
  username: string
}
