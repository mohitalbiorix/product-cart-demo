import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductService } from './product.service';
import { CART_MOCK_DATA, DELETE_PRODUCT_DATA, PRODUCT_MOCK_DATA, PRODUCT_MOCK_DATA_ON_ID } from './product.service.mockData';
import {of} from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService
      ],
      imports: [ HttpClientTestingModule, RouterTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new ProductService(httpClientSpy);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list of products', (done) => {
    httpClientSpy.get.and.returnValue(of(PRODUCT_MOCK_DATA));
      service.getProduct().subscribe({
        next:(product)=>{
          expect(product).toEqual(PRODUCT_MOCK_DATA);
          done();
        },
        error: done.fail
      });
  });

  it('should fetch a product based on productId', (done) => {
    httpClientSpy.get.and.returnValue(of(PRODUCT_MOCK_DATA_ON_ID));
    service.getProductDetails(1).subscribe({
      next:(product)=>{
        expect(product).toEqual(PRODUCT_MOCK_DATA_ON_ID);
        done();
      },
      error: done.fail
    })
  });

  it('should fetch a list of carts', (done) => {
    httpClientSpy.get.and.returnValue(of(CART_MOCK_DATA));
    service.getCartProducts().subscribe({
      next:(product)=>{
        expect(product).toEqual(CART_MOCK_DATA);
        done();
      },
      error: done.fail
    })

  });

  it('should add a product in cart', (done) => {
    httpClientSpy.post.and.returnValue(of(CART_MOCK_DATA));
    const productData = {
      productId:1,
      quantity:1
    }
    service.addProductToCart(productData).subscribe({
      next:(product)=>{
        expect(product).toEqual(CART_MOCK_DATA);
        done();
      },
      error: done.fail
    })
  });

  it('should update a product', (done) => {
    const productData = {
      quantity:5
    }
    httpClientSpy.put.and.returnValue(of(CART_MOCK_DATA));
    service.updateProductFromCart(1,productData).subscribe({
      next:(product)=>{
        expect(product).toEqual(CART_MOCK_DATA);
        done();
      },
      error: done.fail
    })
  });

  it('should delete a product', (done) => {
    httpClientSpy.delete.and.returnValue(of(DELETE_PRODUCT_DATA));
    service.deleteProductFromCart(1).subscribe({
      next:(product:any)=>{
        expect(product).toEqual(DELETE_PRODUCT_DATA);
        expect(product.msg).toEqual('Deleted a Cart successfully with id 285');
        done();
      },
      error: done.fail
    })
  });

});
