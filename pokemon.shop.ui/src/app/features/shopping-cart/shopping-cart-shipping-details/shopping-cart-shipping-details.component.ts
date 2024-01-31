import { TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-shopping-cart-shipping-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    TitleCasePipe,
  ],
  templateUrl: './shopping-cart-shipping-details.component.html',
  styleUrl: './shopping-cart-shipping-details.component.scss'
})
export class ShoppingCartShippingDetailsComponent {
  @Output() formChanged = new EventEmitter<FormGroup>();
  shippingForm: FormGroup;
  shippingTypes = ['free', 'standard', 'express'];
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder) {
    this.shippingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.subscriptions.push(
      this.shippingForm.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(() => {
          this.formChanged.emit(this.shippingForm);
        })
    );
  }

  onDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get formControlNames() {
    return Object.keys(this.shippingForm.controls);
  }
}