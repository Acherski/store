import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavApiService, SearchProducts } from './nav-api.service';

export type FetchStatus = 'IDLE' | 'SUCCESS' | 'ERROR' | 'LOADING';

interface SearchProductState {
  data: SearchProducts | null;
  error: string;
  status: FetchStatus;
}

const initialSearchProductState: SearchProductState = {
  data: null,
  error: '',
  status: 'IDLE',
};

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private searchProductState = new BehaviorSubject<SearchProductState>(
    initialSearchProductState
  );
  public categories = [
    { id: 1, name: 'Electronics', subcategories: ['smartphones', 'laptops'] },
    { id: 2, name: 'Moto', subcategories: ['automotive', 'motorcycle'] },
    { id: 3, name: 'Cosmetics', subcategories: ['fragrances', 'skincare'] },
    { id: 4, name: 'Groceries', subcategories: ['groceries'] },
    { id: 5, name: 'Home', subcategories: ['home-decoration', 'furniture'] },
    {
      id: 6,
      name: 'Fashion',
      subcategories: [
        'tops',
        'womens-dresses',
        'womens-shoes',
        'mens-shirts',
        'mens-shoes',
        'mens-watches',
        'womens-watches',
        'womens-bags',
        'womens-jewellery',
        'sunglasses',
      ],
    },
    { id: 7, name: 'Lighting', subcategories: ['lighting'] },
  ];

  public get searchProductState$() {
    return this.searchProductState.asObservable();
  }

  constructor(private apiService: NavApiService) {}

  public clearSearchData() {
    this.searchProductState.next({
      data: null,
      error: '',
      status: 'IDLE',
    });
  }

  public searchProduct(name: string) {
    this.searchProductState.next({
      ...this.searchProductState.value,
      error: '',
      status: 'LOADING',
    });

    this.apiService.searchProduct(name).subscribe({
      next: (res) => {
        console.log(res);
        this.searchProductState.next({
          data: res,
          error: '',
          status: 'SUCCESS',
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
        this.searchProductState.next({
          data: null,
          error: err.error,
          status: 'ERROR',
        });
      },
    });
  }
}
