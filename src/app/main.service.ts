import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainApiService } from './main-api.service';
import { FetchStatus } from './nav/nav.service';

export interface SingleProductState {
  data: any | null;
  error: string;
  status: FetchStatus;
}

export const initialSingleProductState: SingleProductState = {
  data: null,
  error: '',
  status: 'IDLE',
};

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private singleProductState = new BehaviorSubject<SingleProductState>(
    initialSingleProductState
  );

  public get singleProductState$() {
    return this.singleProductState.asObservable();
  }

  constructor(private apiService: MainApiService) {}

  public getSingleProduct(id: number) {
    this.singleProductState.next({
      ...this.singleProductState.value,
      status: 'LOADING',
      error: '',
    });

    this.apiService.fetchSingleProduct(id).subscribe({
      next: (res) => {
        this.singleProductState.next({
          data: res,
          error: '',
          status: 'SUCCESS',
        });
      },
      error: (err: HttpErrorResponse) => {
        this.singleProductState.next({
          data: null,
          error: err.message,
          status: 'ERROR',
        });
      },
    });
  }
}
