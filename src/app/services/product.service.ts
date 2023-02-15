import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct, CartProducts } from '../interface/cart.interface';
import { ProductDetails, Products } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = "https://dashnex.albiorixtech.in/api/";

  constructor(private http: HttpClient) { }

  getProduct(): Observable<Products[]> {
    return<Observable<Products[]>> this.http.get(this.apiUrl + 'products');
  }

  getProductDetails(productId:number): Observable<ProductDetails>{
    return<Observable<ProductDetails>> this.http.get(this.apiUrl + 'product/' + productId );
  }

  getCartProducts(): Observable<CartProducts> {
    return<Observable<CartProducts>> this.http.get(this.apiUrl + 'cart');
  }

  addProductToCart(productItem: AddProduct){
    return  this.http.post(this.apiUrl +'cart', productItem);
  }

  deleteProductFromCart(id: number){
    return this.http.delete(this.apiUrl + 'cart/'+ id );
  }

  updateProductFromCart(id:number, productItem:AddProduct){
    return this.http.put(this.apiUrl + 'cart/' + id, productItem);
  }
}
