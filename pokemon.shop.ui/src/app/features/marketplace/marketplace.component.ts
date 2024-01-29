import { Component, inject } from '@angular/core';
import { MarketplaceListComponent } from './marketplace-list/marketplace-list.component';
import { PokemonStore } from '../../store/pokemon.store';
import { PokemonCardComponent } from '../shared/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [
    MarketplaceListComponent,
    PokemonCardComponent,
  ],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent {
  private readonly store = inject(PokemonStore);
  selectedPokemon = this.store.selectedPokemon;
}
