import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.updateIsLoggedIn()
    return this.authService.isLoggedIn$.pipe(
      tap(
        isLoggedIn => {
          console.log("canActivate: ", isLoggedIn)
          if(!isLoggedIn) {
            this.router.navigate(["/auth/signin"])
          }
        }
      )
    );
  }

}
