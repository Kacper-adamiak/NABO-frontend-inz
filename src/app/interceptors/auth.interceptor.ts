import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {WebService} from "../services/web.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private web: WebService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url != this.web.SOURCE + "/user/resetPassword") {
      request = this.addAuthHeader(request)

      return next.handle(request).pipe(
        catchError(err => {
          if (err.status == 401) {
            return this.authService.refreshAccessToken().pipe(
              switchMap(() => {
                return next.handle(this.addAuthHeader(request));
              })
            )
          }
          return throwError(err);
        }),
      )
    } else {
      return next.handle(request)
    }
  }

  addAuthHeader(req: HttpRequest<any>) {
    const token = this.authService.getAccessToken()
    if (token) {
      return req.clone({
        setHeaders: {
          'authorization': `Bearer ${this.authService.getAccessToken() || ""}`
        }
      })
    }
    return req
  }

}
