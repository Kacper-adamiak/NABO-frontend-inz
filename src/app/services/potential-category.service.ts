import {Injectable} from '@angular/core';
import {WebService} from "./web.service";

@Injectable({
  providedIn: 'root'
})
export class PotentialCategoryService {

  constructor(private webService: WebService) {

  }

  getPotentialCategories() {
    return this.webService.get<any>('/potentialCategory/all')
  }

  addPotentialCategory(name: string) {
    return this.webService.post<any>('/potentialCategory/add', {name: name})
  }

  acceptPotentialCategoryById(potentialCategoryId: number) {
    return this.webService.post<any>(`/potentialCategory/${potentialCategoryId}`)
  }

  deletePotentialCategoryById(potentialCategoryId: number) {
    return this.webService.delete<any>(`/potentialCategory/${potentialCategoryId}`)
  }

}
