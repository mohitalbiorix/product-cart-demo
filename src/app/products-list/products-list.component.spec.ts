import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductService } from '../services/product.service';
import { CART_MOCK_DATA, PRODUCT_MOCK_DATA } from '../services/product.service.mockData';

import { ProductsListComponent } from './products-list.component';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productService: ProductService;
  const mockRouter = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(ProductService);
  });

  it('should get all products', (() => {

    spyOn(productService, 'getProduct').and.callFake((): any => {
      return of(PRODUCT_MOCK_DATA);
    });

    component.getProductList();
    expect(component.products.length).toBe(1);
    expect(component.products).toBe(PRODUCT_MOCK_DATA.data);

  }));

  it('should get all products that availables in cart', (() => {

    spyOn(productService, 'getCartProducts').and.callFake((): any => {
      return of(CART_MOCK_DATA);
    });

    component.getCartProducts();
    expect(component.productCartData).toBe(CART_MOCK_DATA.data);

  }));

  it('should navigate to login on successful signup', waitForAsync(() => {

    component.openProductDetail(1);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/productDetail/1'], { queryParams: { totalQuantity: 0 } });
    });
  }));

  it('should add product in cart', (() => {
    spyOn(productService, 'addProductToCart').and.callFake((): any => {
      return of(CART_MOCK_DATA);
    });
    component.addToCart(1);
    expect(productService.addProductToCart).toHaveBeenCalledWith({ productId: 1, quantity: 1 });
    Swal.close();
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle()?.textContent).toEqual('Success');
  }));

});
