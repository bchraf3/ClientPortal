import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styles: [`
    .order-list {
      padding: 20px;
    }
    .orders-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 20px;
    }
    .order-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
    }
    .order-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .status {
      color: #007bff;
    }
    .order-details {
      color: #666;
    }
    .order-details h3 {
      color: #333;
      margin: 0 0 10px 0;
    }
    .order-details p {
      margin: 5px 0;
    }
  `]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }
}