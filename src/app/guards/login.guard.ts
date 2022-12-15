import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.checkAndUpdateIsLoggedIn()
    this.authService.checkAndUpdateRoleStatuses()
    return this.checkUserLogin(route);
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    let isLoggedIn = false
    this.authService.isLoggedIn$.subscribe({
      next: value => {
        isLoggedIn = value
      }
    })
    console.log("loginGuard", isLoggedIn)
    if(!isLoggedIn) this.router.navigate(['/'])
    return isLoggedIn;

  }

}
