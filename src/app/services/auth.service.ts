import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, first, map, Observable, tap} from 'rxjs';
import {WebService} from './web.service';
import {Role} from "../enums/role";
import {LocalStorageService} from "./local-storage.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginResponse} from "../models/responses/login-response";
import {LoginData} from "../models/login-data";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable().pipe(first());
  private _isCreator = new BehaviorSubject<boolean>(false);
  isCreator$ = this._isCreator.asObservable().pipe(first());
  private _isAdmin$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = this._isAdmin$.asObservable().pipe(first());

  constructor(
    private webService: WebService,
    private router: Router,
    private localStorageService: LocalStorageService) {
  }

  login(loginData: LoginData): Observable<LoginResponse> {
    return this.webService.post<LoginResponse>("/auth/signin", {
      login: loginData.login,
      password: loginData.password
    })
      .pipe(
        map((response) => {
          if (this.userHasAccess(response.roles)) {
            this.localStorageService.saveUserDataToLocalStorage(response)
            this.updateIsLoggedIn()
            this.updateRoles()
            this.router.navigate(["/home"])
            return response
          }
          throw new HttpErrorResponse( {error: {message:"Nie masz dostępu do panelu twórcy"}})
        })
      )
  }

  updateRoles() {
    this._isCreator.next(this.hasRole(Role.ROLE_CREATOR))
    this._isAdmin$.next(this.hasRole(Role.ROLE_ADMIN))
  }

  updateIsLoggedIn() {
    if (this.getUserData()) this.setValueOfIsLoggedIn(true)
    else this.setValueOfIsLoggedIn(false)
  }

  logout() {

    this.webService.post<any>("/auth/signout").subscribe()
    this.removeUserData()
    this._isLoggedIn$.next(false)
    this._isCreator.next(false)
    this._isAdmin$.next(false)
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
        Role.ROLE_CREATOR
      ],
      password: password
    })
  }

  hasRole(role: Role) {
    const roles = this.getRoles()
    if (roles) return roles.includes(role)
    return false
  }

  setValueOfIsLoggedIn(value: boolean) {
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

  userHasAccess(roles: Role[]) {
    return roles.includes(Role.ROLE_CREATOR) || roles.includes(Role.ROLE_ADMIN)
  }

  forgotPassword(email: string) {
    return this.webService.post<any>('/auth/forgotPassword', {email: email})
  }

}
