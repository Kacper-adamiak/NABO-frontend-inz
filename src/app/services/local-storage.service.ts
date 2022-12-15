import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  key = "123ASFG$Wsdsd#";

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key) || "";
    return this.decrypt(data);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

  saveUserDataToLocalStorage(data: any) {
    this.saveData('user_data', JSON.stringify(data))
  }

  removeUserDataFromLocalStorage() {
    this.removeData('user_data')
  }

  getRolesFromLocalStorage() {
    const user_data = this.getUserDataFromLocalStorage()
    if (user_data && user_data.roles) return user_data.roles
    return null
  }

  getUsernameFromLocalStorage() {
    const user_data = this.getUserDataFromLocalStorage()
    if (user_data && user_data.username) return user_data.username
    return null
  }

  getRefreshTokenFromLocalStorage() {
    const user_data = this.getUserDataFromLocalStorage()
    console.log("-> user_data.refreshToken", user_data.refreshToken);
    if (user_data && user_data.refreshToken) return user_data.refreshToken
    return null
  }

  getAccessTokenFromLocalStorage() {
    const user_data = this.getUserDataFromLocalStorage()
    if (user_data && user_data.token) return user_data.token
    return null
  }

  updateAccessTokenInLocalStorage(token: string) {
    let user_data = this.getUserDataFromLocalStorage()
    if (user_data && user_data.token) {
      user_data.token = token;
      this.saveUserDataToLocalStorage(user_data)
    }
  }

  getUserDataFromLocalStorage() {
    try {
      const data = this.getData('user_data')
      if (data) return JSON.parse(data)
      return null
    } catch (e) {
      return null
    }
  }




}
