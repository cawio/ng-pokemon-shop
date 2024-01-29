import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pokemon } from '../../Models/Pokemon';
import { PokemonStore } from '../../store/pokemon.store';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
  ],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent {
  private readonly store = inject(PokemonStore)
  dataSource = new MatTableDataSource(this.store.entities());
  loading = this.store.loading;
  error = this.store.error;
  columnsToDisplay = ['icon', 'name', 'price', 'quantity', 'cart'];

  constructor() { }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  addToCart(pokemon: Pokemon) {
    this.store.addToCart(pokemon);
  }
}
