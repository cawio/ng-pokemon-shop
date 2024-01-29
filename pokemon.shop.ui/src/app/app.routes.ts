import { Routes } from '@angular/router';
import { MarketplaceComponent } from './features/marketplace/marketplace.component';
import { ShoppingCartComponent } from './features/shopping-cart/shopping-cart.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'marketplace',
        pathMatch: 'full'
    },
    {
        path: 'marketplace',
        component: MarketplaceComponent,
    },
    {
        path: 'cart',
        component: ShoppingCartComponent,
    },
];
