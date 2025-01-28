import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { CallbackComponent } from './components/callback/callback.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { NewOrderComponent } from './components/new-order/new-order.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { 
    path: 'products', 
    component: ProductListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'orders', 
    component: OrderListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'orders/new',
    component: NewOrderComponent,
    canActivate: [authGuard]
  }
];