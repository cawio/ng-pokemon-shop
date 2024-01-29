import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Pokemon } from '../../../Models/Pokemon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon | undefined;
}
