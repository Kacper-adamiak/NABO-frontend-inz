import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, first, map, tap} from 'rxjs';
import {WebService} from '../web/web.service';
import {Role} from "../../enums/role";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {HttpErrorResponse} from "@angular/common/http";

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

  constructor(
    private webService: WebService,
    private router: Router,
    private localStorageService: LocalStorageService) {
  }

  get isLoggedIn() {
    let _isLoggedIn = false
    this.isLoggedIn$.subscribe({
      next: value => {
        _isLoggedIn = value
      }
    })
    return _isLoggedIn
  }

  get isAdmin() {
    let _isAdmin = false
    this.isAdmin$.subscribe({
      next: value => {
        _isAdmin = value
      }
    })
    return _isAdmin
  }

  get isSuperAdmin() {
    let _isSuperAdmin = false
    this.isSuperAdmin$.subscribe({
      next: value => {
        _isSuperAdmin = value
      }
    })
    return _isSuperAdmin
  }

  signin(login: string, password: string) {
    return this.webService.post<any>("/auth/signin", {
      login: login,
      password: password
    })
      .pipe(
        map((response) => {
          if (this.userWithRoleHasAccessToSite(response.roles)) {
            this.localStorageService.saveUserDataToLocalStorage(response)
            this.checkAndUpdateIsLoggedIn()
            this.checkAndUpdateRoleStatuses()
            this.router.navigate(["/home"])
            return response
          }
          throw new HttpErrorResponse( {error: {message:"Nie masz dostępu do panelu twórcy"}})
        })
      )
  }



  logout() {
    this.removeUserData()
    this._isLoggedIn$.next(false)
    this._isAdmin$.next(false)
    this._isSuperAdmin$.next(false)
    this.router.navigate(['/auth/signin'])
  }

  refreshAccessToken() {
    return this.webService.post<any>('/auth/refreshtoken', {refreshToken: this.getRefreshToken()}).pipe(
      tap({
        next: res => {
          this.updateAccessToken(res.accessToken)
        }
      })
    )
  }

  signup(login: string, email: string, password: string) {
    return this.webService.post<any>("/auth/signup", {
      login: login,
      email: email,
      role: [
        Role.ROLE_ADMIN
      ],
      password: password
    })
  }


  checkAndUpdateRoleStatuses() {
    this._isAdmin$.next(this.hasRole(Role.ROLE_ADMIN))
    this._isSuperAdmin$.next(this.hasRole(Role.ROLE_SUPERADMIN))
  }

  checkAndUpdateIsLoggedIn() {
    if (this.getUserData() && this.getAccessToken() && this.getRefreshToken() && this.getRoles()) this.updateIsLoggedIn(true)
    else this.updateIsLoggedIn(false)
  }

  hasRole(role: Role) {
    const roles = this.getRoles()
    console.log("role: ", role)
    console.log("getRoles: ", roles)
    console.log("hasRole: ", roles.includes(role))
    if (roles) return roles.includes(role)
    return false
  }

  updateIsLoggedIn(value: boolean) {
    this._isLoggedIn$.next(value)
  }

  getUserData() {
    return this.localStorageService.getUserDataFromLocalStorage()
  }

  getAccessToken() {
    return this.localStorageService.getAccessTokenFromLocalStorage()
  }

  updateAccessToken(token: string) {
    this.localStorageService.updateAccessTokenInLocalStorage(token)
  }

  getRefreshToken() {
    return this.localStorageService.getRefreshTokenFromLocalStorage()
  }

  getRoles() {
    return this.localStorageService.getRolesFromLocalStorage()
  }

  removeUserData() {
    this.localStorageService.removeUserDataFromLocalStorage()
  }

  userWithRoleHasAccessToSite(roles: Role[]) {
    return roles.includes(Role.ROLE_ADMIN) || roles.includes(Role.ROLE_SUPERADMIN)
  }






}

interface signinResponse {
  email: string
  id: number
  refreshToken: string
  roles: string[]
  token: string
  type: string
  username: string
}
