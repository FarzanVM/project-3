import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  // service to get all products from api
  getAllProducts(){
    return this.http.get<Product[]>("http://localhost:3000/allproducts");
  }
}
