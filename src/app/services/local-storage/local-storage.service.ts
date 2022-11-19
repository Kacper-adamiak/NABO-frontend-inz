import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getUserData() {
    const userData = localStorage.getItem('user_data')
  }



}
