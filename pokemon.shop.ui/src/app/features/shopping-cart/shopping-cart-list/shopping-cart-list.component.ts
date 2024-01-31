import { CurrencyPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CartItem } from '../../../Models/CartItem';

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
  @Input() total = 0;
  @Output() removeItem = new EventEmitter<CartItem>();

  constructor() { }

  removeFromCart(item: CartItem) {
    this.removeItem.emit(item);
  }
}
