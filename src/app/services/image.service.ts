import {Injectable} from '@angular/core';
import {WebService} from "./web.service";
import {Image} from "../models/image";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private webService: WebService) { }

  getImagesByCategory(categoryName: string){
    return this.webService.get<Image[]>(`/image/${categoryName}`)
  }

  uploadImagesByCategory(formimage: FormData){

    const temp = this.webService.post<any>(`/image/uploadImage`, formimage)
    return temp
  }
}
