import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface SearchProducts {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: 1;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class NavApiService {
  constructor(private httpClient: HttpClient) {}

  public searchProduct(name: string) {
    return this.httpClient.get<SearchProducts>(
      `https://dummyjson.com/products/search?q=${name}`
    );
  }
}
