import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { PRODUCT_MOCK_DATA_ON_ID } from '../services/product.service.mockData';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ProductService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 1 } },
            queryParams: of({
              totalQuantity: 1
            })
          }
        }

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get product based on productId', (() => {
    spyOn(productService, 'getProductDetails').and.callFake((): any => {
      return of(PRODUCT_MOCK_DATA_ON_ID);
    });
    component.getProductDetails(1);
    expect(component.productData).toBe(PRODUCT_MOCK_DATA_ON_ID.data);
    expect(component.productTitle).toBe(PRODUCT_MOCK_DATA_ON_ID.data.title);
    expect(component.productPrice).toBe(PRODUCT_MOCK_DATA_ON_ID.data.price);
    expect(component.productDesc).toBe(PRODUCT_MOCK_DATA_ON_ID.data.description);
  }));

  it('should get params and queryparams', () => {
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    const productId = activatedRoute.snapshot.params['id'];
    fixture.detectChanges();
    activatedRoute.queryParams.subscribe((productItem) => {
      expect(component.totalQuantity).toEqual(productItem['totalQuantity']);
      expect(component.productId).toEqual(productId);
    })
  });

});
