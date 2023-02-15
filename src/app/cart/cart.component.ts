import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Cart } from '../interface/cart.interface';
import { ProductService } from '../services/product.service';
import { DashnexNotificationService } from '../shared/dashnex-notification/dashnex-notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Cart[];
  cartTotal = 0;
  basePath: string = environment?.imagePath;
  totalQunatity: number = 0;

  constructor(
    private router: Router, 
    private productService: ProductService,
    private dashnexNotificationService: DashnexNotificationService
    ) { }

  ngOnInit() {
    this.getCartProducts();
  }

  // get all products in cart
  getCartProducts() {
    this.totalQunatity = 0;
    this.productService.getCartProducts().subscribe({
      next: (cardItems) => {
        this.products = cardItems.data;
        this.products.forEach((product: any) => {
          if (product?.product?.image) {
            this.totalQunatity += product.quantity;
          }
        });
        this.calculateTotal();
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete')
    })
  }

  // get product detail basesd on productId
  goToProductDetail(productId: number) {
    this.router.navigate(['/productDetail/' + productId], {
      queryParams: {
        totalQuantity: this.totalQunatity
      }
    });
  }

  // calculate total of products
  calculateTotal() {
    this.products.forEach((product: any) => {
      product.product.total = product.product.price * product.quantity;
      this.cartTotal += product.product.total;
    })
  }

  // increment quantity of product
  incrementQty(index: number, ProductId: number) {
    this.products[index].quantity = +this.products[index].quantity + 1;
    let body = {
      "quantity": this.products[index].quantity
    }
    this.productService.updateProductFromCart(ProductId, body).subscribe({
      next: () => {
        this.getCartProducts()
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete')
    });
    this.calculateTotal();
  }

  // decrement quantity of product
  decrementQty(index: number, productId: number) {
    if (this.products[index].quantity > 1) {
      this.products[index].quantity = this.products[index].quantity - 1;
      let quantity = {
        "quantity": this.products[index].quantity
      }
      this.productService.updateProductFromCart(productId, quantity).subscribe({
        next: () => {
          this.getCartProducts();
          this.calculateTotal();
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete')
      });
    }
    else {
      this.dashnexNotificationService.showDeleteConfirmationDialog().then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProductFromCart(productId).subscribe({
            next: () => {
              this.dashnexNotificationService.showDeleteConfirmationSuccess();
              this.getCartProducts();
            },
            error: (error) => console.error(error),
            complete: () => console.info('complete')
          });
        }
      })
    }
  }

  // delete product item
  deleteProductItem(index: number) {
    this.dashnexNotificationService.showDeleteConfirmationDialog().then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductFromCart(index).subscribe({
          next: () => {
            this.dashnexNotificationService.showDeleteConfirmationSuccess();
            this.getCartProducts();
          },
          error: (error) => console.error(error),
          complete: () => console.info('complete')
        });
      }
    })
  }
}
