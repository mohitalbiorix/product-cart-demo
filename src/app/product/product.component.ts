import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Product } from '../interface/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: number;
  productData: Product;
  productTitle: string | undefined;
  productPrice: number | undefined;
  productDesc: string |undefined;
  totalQuantity:number=0;
  basePath: string = environment?.imagePath;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { 
    this.productId = +this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.queryParams.subscribe(productItem=>{
      this.totalQuantity=productItem['totalQuantity'];
    })
  }

  ngOnInit(): void {
    if (this.productId) {
      this.getProductDetails(this.productId);
    }
  }

  // get product details
  getProductDetails(productId: number) {
    this.productService.getProductDetails(productId).subscribe({
      next: (productItem) => {
        this.productData = productItem?.data;
        if (this.productData) {
          this.productTitle = this.productData.title;
          this.productPrice = this.productData.price;
          this.productDesc = this.productData.description;
        }
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete')
    })
  }
}


