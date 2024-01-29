import { Component, inject } from '@angular/core';
import { PokemonStore } from '../../store/pokemon.store';
import { MatStepperModule } from '@angular/material/stepper';
import { ShoppingCartListComponent } from './shopping-cart-list/shopping-cart-list.component';
import { MatButtonModule } from '@angular/material/button';
import { CartItem } from '../../Models/CartItem';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    MatStepperModule,
    ShoppingCartListComponent,
    MatButtonModule,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  private readonly store = inject(PokemonStore);
  cart = this.store.cart;

  constructor() { }

  removeFromCart(item: CartItem) {
    this.store.removeFromCart(item.product);
  }
}
