import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    // this.ROOT_URL = 'https://springforinz-testapp1.azuremicroservices.io/api'
    this.ROOT_URL = 'http://localhost:8081/api'
   }

  get<T>(uri: string) {
    return this.http.get<T>(`${this.ROOT_URL}${uri}`).pipe(
      tap(
        res => console.log('get: ',res)
      )
    )
  }

  post<T>(uri: string, payload: any) {
    return this.http.post<T>(`${this.ROOT_URL}${uri}`, payload).pipe(
      tap(
        res => console.log('Post: ',res)
      )
    )
  }

  patch<T>(uri: string, payload: any) {
    return this.http.patch<T>(`${this.ROOT_URL}${uri}`, payload).pipe(
      tap(
        res => console.log(res)
      )
    )
  }

  delete<T>(uri: string) {
    return this.http.delete<T>(`${this.ROOT_URL}${uri}`).pipe(
      tap(
        res => console.log(res)
      )
    )
  }
}
