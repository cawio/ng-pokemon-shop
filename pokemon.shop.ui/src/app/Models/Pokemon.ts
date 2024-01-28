import { PokemonStats } from "./PokemonStats";

export type Pokemon = {
    id: number;
    name: string;
    types: string[];
    height: number;
    weight: number;
    image: string;
    stats: PokemonStats;
    abilities: string[];
    price: number;
    quantity: number;
};