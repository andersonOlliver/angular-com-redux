import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';

@Injectable({providedIn: 'root'})
export class DataService {
  public url = 'http://localhost:7189/v1';

  constructor(private httpClient: HttpClient) { }

  getProducts(){
    return this.httpClient.get<ProductModel[]>(`${this.url}/products`);
  }
}
