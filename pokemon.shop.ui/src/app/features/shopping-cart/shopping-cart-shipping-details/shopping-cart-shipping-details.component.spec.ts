import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartShippingDetailsComponent } from './shopping-cart-shipping-details.component';

describe('ShoppingCartShippingDetailsComponent', () => {
  let component: ShoppingCartShippingDetailsComponent;
  let fixture: ComponentFixture<ShoppingCartShippingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartShippingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingCartShippingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
