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

export function isPokemon(arg: any): arg is Pokemon {
    return arg && arg.id && arg.name && arg.types && arg.height && arg.weight && arg.image && arg.stats && arg.abilities && arg.price && arg.quantity;
}