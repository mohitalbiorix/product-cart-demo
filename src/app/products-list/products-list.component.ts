import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../interface/product.interface';
import { AddProduct, Cart } from '../interface/cart.interface';
import { environment } from 'src/environments/environment.development';
import { DashnexNotificationService } from '../shared/dashnex-notification/dashnex-notification.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  products: Product[];
  basePath: string = environment?.imagePath;
  totalQuantity: any = 0;
  productCartData: Cart[];


  constructor(
    private router: Router, 
    private productService: ProductService,
    private dashnexNotificationService: DashnexNotificationService) { }

  ngOnInit() {
    this.getProductList();
    this.getCartProducts();
  }

  // get all products
  getProductList() {
    this.productService.getProduct().subscribe({
      next: (product: any) => {
        this.products = product?.data;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete')
    })
  }

  // get all products quantity
  getCartProducts() {
    this.totalQuantity = 0;
    this.productService.getCartProducts().subscribe({
      next: (cartItem: any) => {
        this.productCartData = cartItem.data;
        if (this.productCartData.length && this.productCartData.length > 0) {
          this.productCartData.forEach((element: any) => {
            this.totalQuantity += element.quantity;
          });
        }
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete')
    })
  }

  // go to product details page with params productId
  openProductDetail(productId: number | undefined) {
    this.router.navigate(['/productDetail/' + productId], {
      queryParams: {
        totalQuantity: this.totalQuantity
      }
    });
  }

  // add product to cart
  addToCart(productId?: number) {
    const productItem: AddProduct = {
      productId: productId,
      quantity: 1
    }
    this.productService.addProductToCart(productItem).subscribe({
      next: (productItem: any) => {
        if (!productItem.msg) {
          this.dashnexNotificationService.showSuccessMessage(productItem.msg);
          this.getCartProducts();
        }
        else {
          this.dashnexNotificationService.showErrorMessage(productItem.msg);
        }
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete')
    });
  }
}

