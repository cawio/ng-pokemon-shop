import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PokemonStore } from '../../store/pokemon.store';
import { MatButtonModule } from '@angular/material/button';
import { Pokemon } from '../../Models/Pokemon';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent {
  private readonly store = inject(PokemonStore)
  pokemons = this.store.entities;
  loading = this.store.loading;
  error = this.store.error;
  columnsToDisplay = ['icon', 'name', 'price', 'quantity', 'cart'];


  constructor() { }

  addToCart(pokemon: Pokemon) {
    this.store.addToCart(pokemon);
  }
}
