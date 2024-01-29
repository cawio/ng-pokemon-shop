import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pokemon, isPokemon } from '../../../Models/Pokemon';
import { PokemonStore } from '../../../store/pokemon.store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-marketplace-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    NgClass,
  ],
  templateUrl: './marketplace-list.component.html',
  styleUrl: './marketplace-list.component.scss'
})
export class MarketplaceListComponent {
  private readonly store = inject(PokemonStore)
  dataSource = new MatTableDataSource(this.store.entities());
  loading = this.store.loading;
  error = this.store.error;
  columnsToDisplay = ['icon', 'name', 'price', 'quantity', 'cart'];
  slectedPokemon = this.store.selectedPokemon;

  constructor() { }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  addToCart(pokemon: Pokemon) {
    this.store.addToCart(pokemon);
  }

  rowSelectionChange(pokemon: any) {
    if (!isPokemon(pokemon)) {
      return;
    }

    if (this.store.selectedPokemon() && this.store.selectedPokemon()?.id === pokemon.id) {
      this.store.clearPokemonSelection();
      return;
    }

    this.store.selectPokemon(pokemon);
  }

  isRowSelected(pokemon: any): boolean {
    if (!isPokemon(pokemon) || this.slectedPokemon() == undefined) {
      return false;
    }

    return pokemon.id === this.slectedPokemon()?.id;
  }
}
