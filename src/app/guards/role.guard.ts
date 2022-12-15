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
    console.log("roleGuard", roleFromData)
    if (roleFromData == null) return false
    console.log("roleGuard after roleFrom")
    let role: Role = Role[roleFromData as keyof typeof Role]
    console.log("roleGuard role: ", role)
    if (!this.authService.hasRole(role)) {
      console.log("roleGuard after has role")
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
