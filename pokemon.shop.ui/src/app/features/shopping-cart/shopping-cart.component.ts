import { Component, ViewChild, effect, inject, input } from '@angular/core';
import { PokemonStore } from '../../store/pokemon.store';
import { MatStepperModule } from '@angular/material/stepper';
import { ShoppingCartListComponent } from './shopping-cart-list/shopping-cart-list.component';
import { MatButtonModule } from '@angular/material/button';
import { CartItem } from '../../Models/CartItem';
import { ShoppingCartShippingDetailsComponent } from './shopping-cart-shipping-details/shopping-cart-shipping-details.component';
import { patchState, signalState } from '@ngrx/signals';
import { OrderDetails } from '../../Models/OrderDetails';
import { ShippingDetails } from '../../Models/ShippingDetails';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    MatStepperModule,
    ShoppingCartListComponent,
    MatButtonModule,
    ShoppingCartShippingDetailsComponent
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  private readonly store = inject(PokemonStore);
  cart = this.store.cart;
  total = this.store.cartTotal;
  orderState = signalState<OrderDetails>({
    id: 0,
    orderItems: [],
    shippingDetails: {
      name: '',
      email: '',
      address: '',
      city: '',
      country: '',
      zip: '',
      type: 'standard'
    },
    paymentMethod: 'credit'
  });

  constructor() {
    effect(() => {
      console.log('order has changed', this.orderState());
    });
  }

  removeFromCart(item: CartItem) {
    this.store.removeFromCart(item.product);
  }

  patchOrderItems() {
    patchState(this.orderState, { orderItems: this.cart() });
  }

  patchShippingDetails(shippingForm: FormGroup) {
    const details = shippingForm.value as ShippingDetails;
    patchState(this.orderState, { shippingDetails: details });
  }

  patchPaymentMethod(method: 'credit' | 'paypal') {
    patchState(this.orderState, { paymentMethod: method });
  }
}
