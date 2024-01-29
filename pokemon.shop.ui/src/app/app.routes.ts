import { Routes } from '@angular/router';
import { MarketplaceComponent } from './features/marketplace-list/marketplace-list.component';

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
