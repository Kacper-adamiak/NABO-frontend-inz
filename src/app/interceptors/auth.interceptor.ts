import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const headers= new HttpHeaders()
    .set('authorization', `Bearer ${localStorage.getItem('access_token') || ""}`)

    request = request.clone({headers: headers});

    console.log("Interceptor: ", request);

    return next.handle(request);
  }
}
