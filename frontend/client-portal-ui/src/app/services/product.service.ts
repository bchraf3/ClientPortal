import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  // Mock data
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is a description for product 1',
      price: 99.99,
      active: true
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is a description for product 2',
      price: 149.99,
      active: true
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is a description for product 3',
      price: 199.99,
      active: true
    }
  ];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    // Return mock data instead of HTTP call
    return of(this.mockProducts);
  }

  getProduct(id: number): Observable<Product> {
    // Return mock product by id
    const product = this.mockProducts.find(p => p.id === id);
    return of(product as Product);
  }
}