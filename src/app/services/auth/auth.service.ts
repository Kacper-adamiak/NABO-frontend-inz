import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, first, map, tap} from 'rxjs';
import {WebService} from '../web/web.service';
import {Role} from "../../enums/role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable().pipe(first());
  private _isAdmin$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = this._isAdmin$.asObservable().pipe(first());
  private _isSuperAdmin$ = new BehaviorSubject<boolean>(false);
  isSuperAdmin$ = this._isSuperAdmin$.asObservable().pipe(first());

  constructor(private webService: WebService, private router: Router) {}


  updateRoleStatuses() {
    this._isAdmin$.next(this.hasRole(Role.Admin))
    this._isSuperAdmin$.next(this.hasRole(Role.SuperAdmin))
  }


   updateIsLoggedIn() {
     const data = localStorage.getItem('user_data')!
    if(data && data != ''){
      const user_data = JSON.parse(data)
      if(user_data){
        if(user_data.access_token) {
          this._isLoggedIn$.next(!!(user_data) && !!(user_data.access_token))
        }
      }
    }
   }

   getAccessToken() {
    const user_data = JSON.parse(localStorage.getItem('user_data')!)
     if(!(!!(user_data) && !!(user_data.access_token))) return ''
      return user_data.access_token
   }

   setAccessToken(token: string) {
      let user_data = JSON.parse(localStorage.getItem('user_data')!)
     if(!!user_data && !!(user_data.access_token)) {
      user_data.access_token = token;
      localStorage.setItem('user_data', JSON.stringify(user_data))
     }
   }

   getRefreshToken() {
     const user_data = JSON.parse(localStorage.getItem('user_data')!)
     if(!(!!(user_data) && !!(user_data.refresh_token))) return ''
     return user_data.refresh_token
   }

   hasRole(role: Role) {
     const user_data = JSON.parse(localStorage.getItem('user_data')!)
     console.log(user_data)
     if(!(!!user_data && !!(user_data.roles))) return false
     return user_data.roles.includes(role)
   }

   logout() {
    localStorage.removeItem('user_data')
     this._isLoggedIn$.next(false);
     this._isAdmin$.next(false)
     this._isSuperAdmin$.next(false)
     this.router.navigate(['/'])
   }

  signin(login: String, password: String) {
    return this.webService.post<signinResponse>("/auth/signin", {
      login: login,
      password: password
    })
    .pipe(
      map((response) => {
        localStorage.setItem('user_data', JSON.stringify({access_token: response.token, refresh_token: response.refreshToken, roles: response.roles}));

        if(response.roles.includes("ROLE_ADMIN") || response.roles.includes("ROLE_SUPERADMIN")) {
          this.updateIsLoggedIn()
          this.updateRoleStatuses()
          this.router.navigate(["/home"])
          return response
        }
        throw new Error("Nie masz dostępu do panelu twórcy")
      })
    )
  }

  refreshAccessToken() {
    return this.webService.post<any>('/auth/refreshtoken', { refreshToken: this.getRefreshToken()}).pipe(
      tap({
        next: res => {
          this.setAccessToken(res.accessToken)
        }
      })
    )
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
