import {BehaviorSubject, tap} from "rxjs";

export class LoadingState {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable().pipe(
    tap(value => {

    })
  );
  private loadingCount = 0

  constructor() {

  }

  setLoading() {
    if(this.loadingCount == 0){
      this._loading.next(true);
    }
    this.loadingCount++
  }

  setNotLoading() {
    this.loadingCount--
    if(this.loadingCount == 0){
      this._loading.next(false);
    }
  }
}
