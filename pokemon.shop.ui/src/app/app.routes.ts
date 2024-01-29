import { Routes } from '@angular/router';
import { MarketplaceComponent } from './features/marketplace/marketplace.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'marketplace',
        pathMatch: 'full'
    },
    {
        path: 'marketplace',
        component: MarketplaceComponent,
    }
];
