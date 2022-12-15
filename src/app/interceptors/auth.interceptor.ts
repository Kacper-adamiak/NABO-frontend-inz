import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {WebService} from "../services/web.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private web: WebService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor: ", request);
    if (request.url != this.web.SOURCE + "/user/resetPassword") {
      request = this.addAuthHeader(request)

      return next.handle(request).pipe(
        catchError(err => {
          console.log(err)
          if (err.status == 401) {
            this.authService.refreshAccessToken().subscribe({
                next: res => {
                  console.log("Odnowiono access token!")

                },
                error: err1 => {
                  this.authService.logout();
                }
              }
            )
          }
          return throwError(err);
        })
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
