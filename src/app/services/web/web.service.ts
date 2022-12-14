import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  readonly SOURCE = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  get<T>(uri: string) {
    return this.http.get<T>(`${this.SOURCE}${uri}`).pipe(
      tap(
        res => console.log('get: ',res)
      )
    )
  }

  post<T>(uri: string, payload?: any) {
    return this.http.post<T>(`${this.SOURCE}${uri}`, payload).pipe(
      tap(
        res => console.log('Post: ',res)
      )
    )
  }

  patch<T>(uri: string, payload?: any) {
    return this.http.patch<T>(`${this.SOURCE}${uri}`, payload).pipe(
      tap(
        res => console.log(res)
      )
    )
  }

  delete<T>(uri: string) {
    return this.http.delete<T>(`${this.SOURCE}${uri}`).pipe(
      tap(
        res => console.log(res)
      )
    )
  }
}
