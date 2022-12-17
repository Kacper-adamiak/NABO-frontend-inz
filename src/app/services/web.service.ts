import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  readonly SOURCE = 'http://localhost:8081/api';
  readonly URL_WITHOUT_AUTH = [
    'http://localhost:8081/api/auth/signup',
    'http://localhost:8081/api/auth/signin',
    'http://localhost:8081/api/auth/forgotPassword'
  ]

  constructor(private http: HttpClient) {
  }

  get<T>(url: string) {
    return this.http.get<T>(`${this.SOURCE}${url}`)
  }

  post<T>(url: string, payload?: any) {
    return this.http.post<T>(`${this.SOURCE}${url}`, payload)
  }

  patch<T>(url: string, payload?: any) {
    return this.http.patch<T>(`${this.SOURCE}${url}`, payload)
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${this.SOURCE}${url}`)
  }
}
