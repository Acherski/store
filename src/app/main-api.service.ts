import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './nav/nav-api.service';

@Injectable({
  providedIn: 'root',
})
export class MainApiService {
  constructor(private httpClient: HttpClient) {}

  public fetchSingleProduct(productId: number) {
    return this.httpClient.get<Product>(
      `https://dummyjson.com/products/${productId}`
    );
  }
}
