import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../Models/CartItem';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart-list',
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
  ],
  templateUrl: './shopping-cart-list.component.html',
  styleUrl: './shopping-cart-list.component.scss'
})
export class ShoppingCartListComponent {
  @Input() cart: CartItem[] = [];
  @Output() removeItem = new EventEmitter<CartItem>();

  constructor() { }

  removeFromCart(item: CartItem) {
    this.removeItem.emit(item);
  }

  total(): number {
    return this.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
}
