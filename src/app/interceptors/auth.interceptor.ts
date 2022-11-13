import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, Subject, tap, throwError} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  refreshingAccessToken: boolean  = false
  accessTokenRefreshed: Subject<any> = new Subject()

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = this.addAuthHeader(request)
    console.log("Interceptor: ", request);
      return next.handle(request).pipe(catchError(err => {
        console.log(err)
        if (err.status == 401) {
          this.authService.logout();
        }

        const error = err;
        return throwError(error);
      })
    )
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken){
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          observer.next();
          observer.complete();
        })
      })
    }else {
      this.refreshingAccessToken = true
      return this.authService.getRefreshToken().pipe(
        tap(() => {
          console.log("Odnowiono access token!")
          this.refreshingAccessToken = false
          this.accessTokenRefreshed.next(2)
        })
      )
    }
  }

  addAuthHeader(req: HttpRequest<any>){
    const token = this.authService.getAccessToken()
    if(token){
      return req.clone({
        setHeaders: {
          'authorization': `Bearer ${this.authService.getAccessToken()}`
        }
      })
    }
    return req
  }

}
