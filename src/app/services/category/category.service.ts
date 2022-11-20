import {Injectable} from '@angular/core';
import {WebService} from "../web/web.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private webService: WebService
  ) { }

  getCategories() {
    return this.webService.get<any>('/StatusCategory/categories')
  }

  addCategory(categoryName: string) {
    return this.webService.post<any>('/StatusCategory/addCategory', {
      name: categoryName
    })
  }

  editCategory(categoryId: number, categoryName: string) {
    return this.webService.patch<any>(`/StatusCategory/editCategory/${categoryId}`, {
      name: categoryName
    })
  }

}
