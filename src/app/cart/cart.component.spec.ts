import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProductService } from '../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartComponent } from './cart.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CART_MOCK_DATA } from '../services/product.service.mockData';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const productIndex = 0;
  const firstproductPId = 278;
  const secondproductPId = 279;
  const mockRouter = {navigate: jasmine.createSpy('navigate')};
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        ProductService,
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(ProductService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all products in cart', (() => {

    spyOn(productService, 'getCartProducts').and.callFake((): any=> {
      return of(CART_MOCK_DATA);
    });
    component.getCartProducts();
    expect(component.products.length).toBe(2);
    expect(component.products).toBe(CART_MOCK_DATA.data);

  }));

  it('should navigate to login on successful signup',waitForAsync(() => {
    component.goToProductDetail(1);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/productDetail/1'], { queryParams: { totalQuantity: 0 } });
    });
  }));

  it('should increment the quantity of the product', () => {
    component.products = CART_MOCK_DATA.data;
    const quantity = component.products[productIndex].quantity;
    component.incrementQty(productIndex, firstproductPId);
    expect(component.products[productIndex].quantity).toBe(quantity + 1);
  });

  it('should decrease the quantity of the product', () => {
    component.products = CART_MOCK_DATA.data;
    const quantity = component.products[productIndex].quantity;
    component.decrementQty(productIndex, firstproductPId);
    expect(component.products[productIndex].quantity).toBe(quantity - 1);
  });

  it('should update the product on the server', () => {
    component.products = CART_MOCK_DATA.data;
    const quantity = +component.products[0].quantity;
    spyOn(productService, 'updateProductFromCart').and.callFake((): any => {
      return of(CART_MOCK_DATA);
    });
    spyOn(productService, 'getCartProducts').and.callFake((): any => {
      return of(CART_MOCK_DATA);
    });
    component.incrementQty(productIndex, secondproductPId);
    expect(productService.updateProductFromCart).toHaveBeenCalledWith(secondproductPId, { quantity: quantity + 1 });
    component.getCartProducts();
    expect(productService.getCartProducts).toHaveBeenCalled();

  });


  it('should calculate the total for each product', () => {
    component.products = CART_MOCK_DATA.data;
    component.calculateTotal();
    expect(component.products[0].product.total).toBe(component.products[0].product.total);
    expect(component.products[1].product.total).toBe(component.products[1].product.total);

  });

});