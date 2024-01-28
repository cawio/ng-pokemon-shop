import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../Models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  fetchPokemons(): Observable<Pokemon[]> {
    return of(mockPokemons);
  }
}

const mockPokemons: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    types: ["grass", "poison"],
    height: 7,
    weight: 69,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45
    },
    abilities: ["overgrow", "chlorophyll"],
    price: 10,
    quantity: 150,
  },
  {
    id: 2,
    name: "Ivysaur",
    types: ["grass", "poison"],
    height: 10,
    weight: 130,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    stats: {
      hp: 60,
      attack: 62,
      defense: 63,
      specialAttack: 80,
      specialDefense: 80,
      speed: 60
    },
    abilities: ["overgrow", "chlorophyll"],
    price: 50,
    quantity: 100,
  },
  {
    id: 3,
    name: "Venusaur",
    types: ["grass", "poison"],
    height: 20,
    weight: 1000,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    stats: {
      hp: 80,
      attack: 82,
      defense: 83,
      specialAttack: 100,
      specialDefense: 100,
      speed: 80
    },
    abilities: ["overgrow", "chlorophyll"],
    price: 100,
    quantity: 0,
  },
  {
    id: 4,
    name: "Charmander",
    types: ["fire"],
    height: 6,
    weight: 85,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      specialAttack: 60,
      specialDefense: 50,
      speed: 65
    },
    abilities: ["blaze", "solar-power"],
    price: 200,
    quantity: 95,
  },
  {
    id: 5,
    name: "Charmeleon",
    types: ["fire"],
    height: 11,
    weight: 190,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    stats: {
      hp: 58,
      attack: 64,
      defense: 58,
      specialAttack: 80,
      specialDefense: 65,
      speed: 80
    },
    abilities: ["blaze", "solar-power"],
    price: 300,
    quantity: 23,
  },
];