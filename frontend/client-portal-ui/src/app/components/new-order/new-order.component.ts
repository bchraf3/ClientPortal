import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-order.component.html',
  styles: [`
    .new-order {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
    .product-details {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      &:disabled {
        background-color: #ccc;
      }
    }
    .price {
      font-size: 1.2em;
      color: #007bff;
      font-weight: bold;
    }
  `]
})
export class NewOrderComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.queryParams['productId'];
    if (productId) {
      this.productService.getProduct(Number(productId)).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (error) => {
          console.error('Error fetching product:', error);
          this.router.navigate(['/products']);
        }
      });
    }
  }

  submitOrder() {
    if (this.product && this.quantity > 0) {
      this.orderService.createOrder(this.product.id, this.quantity).subscribe({
        next: () => {
          this.router.navigate(['/orders']);
        },
        error: (error) => {
          console.error('Error creating order:', error);
        }
      });
    }
  }
}