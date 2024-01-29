import { Routes } from '@angular/router';
import { MarketplaceListComponent } from './features/marketplace-list/marketplace-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'marketplace',
        pathMatch: 'full'
    },
    {
        path: 'marketplace',
        component: MarketplaceListComponent,
    }
];
