import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {Role} from "../enums/role";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserHasRole(route);
  }

  checkUserHasRole(route: ActivatedRouteSnapshot): boolean {
    let roleFromData: string = route.data['role']
    if (roleFromData == null) {
      return false
    }
    let role: Role = Role[roleFromData as keyof typeof Role]
    if (!this.authService.hasRole(role)) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
